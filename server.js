require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SWE445')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Enhanced User Model with Login Attempt Tracking
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date }
}, { collection: 'users' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

// Auth Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });
    
    res.json({ 
      token, 
      userId: user._id, 
      username,
      message: 'Registration successful' 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Account lock check
    if (user?.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = Math.floor((user.lockUntil - new Date()) / 1000); // in seconds
      return res.status(403).json({ 
        error: 'Account locked due to too many attempts.',
        locked: true,
        remainingTime
      });
    }

    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const attempts = (user?.loginAttempts || 0) + 1;
      let updateData = { loginAttempts: attempts };

      // Lock account on 3rd failed attempt
      if (attempts >= 3) {
        updateData.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      }

      if (user) {
        await User.updateOne({ email }, { $set: updateData });
      }

      return res.status(401).json({
        error: attempts >= 3 
          ? 'Account locked for 15 minutes. Please wait.' 
          : `Invalid credentials. ${3 - attempts} attempts left.`,
        locked: attempts >= 3,
        remainingTime: attempts >= 3 ? 15 * 60 : null
      });
    }

    // Reset on successful login
    if (user?.loginAttempts > 0 || user?.lockUntil) {
      await User.updateOne(
        { email },
        { $set: { loginAttempts: 0, lockUntil: null } }
      );
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });
    
    res.json({ 
      token, 
      userId: user._id, 
      username: user.username,
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/patient', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'patient.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));