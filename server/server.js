// server/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const doctors = require("./data/doctors.json");
let appointments = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all doctors
app.get("/api/doctors", (req, res) => {
  res.json(doctors);
});

// Get doctor by ID
app.get("/api/doctors/:id", (req, res) => {
  const doctor = doctors.find((d) => d.id === req.params.id);
  if (doctor) res.json(doctor);
  else res.status(404).json({ message: "Doctor not found" });
});

// Book appointment
app.post("/api/appointments", (req, res) => {
  const { name, email, date, time, doctorId } = req.body;
  if (!name || !email || !date || !time || !doctorId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  appointments.push({ name, email, date, time, doctorId });
  res.json({ message: "Appointment booked successfully" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
