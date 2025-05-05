# 🏥 Healthcare System

A secure Node.js authentication system for healthcare applications, featuring:
- **Patient/Staff Login & Registration**
- **MongoDB Database Integration**
- **JWT Token Authentication**
- **Brute-Force Protection** (3-attempt lockout)

## 🚀 Features

- ✅ Secure password hashing with bcryptjs
- ✅ 15-minute account lock after 3 failed attempts
- ✅ Real-time countdown timer during lockout
- ✅ Responsive UI with clean dashboard
- ✅ Protected API endpoints

## 🔧 Installation

1. Clone the repository:
   ```bash
   https://github.com/MahmoudAlmarhoon/helthcare-application

2. Install dependencies:
Bash
npm install express mongoose bcryptjs jsonwebtoken dotenv

3. Set up environment variables:
in your VSCode Click write and add new file .env, this is used for session tokens secret key you can change it, and write this inside it:
JWT_SECRET=Secret

# Edit .env with your MongoDB and JWT settings

4. Start the server:
bash
node server.js
📦 Tech Stack
Backend: Node.js, Express, MongoDB

Frontend: HTML5, CSS3, JavaScript

Security: JWT, bcrypt, rate-limiting

Tools: GitHub Desktop, Postman
