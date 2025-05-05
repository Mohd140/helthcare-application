document.addEventListener('DOMContentLoaded', () => {
  // Extensive Dummy Data (20 patients)
  const dummyPatients = [
    {
      id: 1001,
      fullName: "Emily Johnson",
      age: 34,
      gender: "Female",
      status: "active",
      lastVisit: "2023-06-15",
      bloodType: "A+",
      conditions: ["Hypertension", "Type 2 Diabetes"],
      medications: ["Metformin", "Lisinopril"]
    },
    {
      id: 1002,
      fullName: "Michael Chen",
      age: 28,
      gender: "Male",
      status: "active",
      lastVisit: "2023-06-18",
      bloodType: "O-",
      conditions: ["Migraine"],
      medications: ["Sumatriptan"]
    },
    {
      id: 1003,
      fullName: "Sarah Williams",
      age: 45,
      gender: "Female",
      status: "inactive",
      lastVisit: "2023-01-10",
      bloodType: "B+",
      conditions: ["Asthma"],
      medications: ["Albuterol"]
    },
    {
      id: 1004,
      fullName: "Robert Garcia",
      age: 52,
      gender: "Male",
      status: "active",
      lastVisit: "2023-06-10",
      bloodType: "AB+",
      conditions: ["High Cholesterol", "GERD"],
      medications: ["Atorvastatin", "Omeprazole"]
    },
    {
      id: 1005,
      fullName: "Olivia Martinez",
      age: 29,
      gender: "Female",
      status: "active",
      lastVisit: "2023-05-22",
      bloodType: "A-",
      conditions: ["Depression"],
      medications: ["Sertraline"]
    },
    {
      id: 1006,
      fullName: "James Wilson",
      age: 61,
      gender: "Male",
      status: "active",
      lastVisit: "2023-06-12",
      bloodType: "O+",
      conditions: ["Arthritis", "Hypertension"],
      medications: ["Ibuprofen", "Losartan"]
    },
    {
      id: 1007,
      fullName: "Sophia Lee",
      age: 38,
      gender: "Female",
      status: "inactive",
      lastVisit: "2022-11-30",
      bloodType: "B-",
      conditions: ["Anxiety"],
      medications: ["Lorazepam"]
    },
    {
      id: 1008,
      fullName: "David Kim",
      age: 42,
      gender: "Male",
      status: "active",
      lastVisit: "2023-06-05",
      bloodType: "A+",
      conditions: ["Sleep Apnea"],
      medications: ["CPAP Therapy"]
    },
    {
      id: 1009,
      fullName: "Emma Thompson",
      age: 31,
      gender: "Female",
      status: "active",
      lastVisit: "2023-05-15",
      bloodType: "O+",
      conditions: ["PCOS"],
      medications: ["Birth Control"]
    },
    {
      id: 1010,
      fullName: "Daniel Brown",
      age: 55,
      gender: "Male",
      status: "inactive",
      lastVisit: "2023-02-28",
      bloodType: "AB-",
      conditions: ["Type 1 Diabetes"],
      medications: ["Insulin"]
    }
  ];

  // Enhanced Render Function
  function renderPatients(patients) {
    const container = document.getElementById('patientsList');
    
    container.innerHTML = patients.map(patient => `
      <div class="patient-card">
        <div class="patient-header">
          <h3>${patient.fullName} <span class="patient-id">#${patient.id}</span></h3>
          <span class="status-badge ${patient.status}">${patient.status.toUpperCase()}</span>
        </div>
        
        <div class="patient-details">
          <div class="detail-row">
            <span class="detail-label">Age/Gender:</span>
            <span>${patient.age}yo ${patient.gender}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Last Visit:</span>
            <span>${patient.lastVisit}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Blood Type:</span>
            <span class="blood-type ${patient.bloodType.replace('+','pos').replace('-','neg')}">
              ${patient.bloodType}
            </span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Conditions:</span>
            <span>${patient.conditions.join(', ')}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Medications:</span>
            <span>${patient.medications.join(', ')}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initialize
  renderPatients(dummyPatients);
});