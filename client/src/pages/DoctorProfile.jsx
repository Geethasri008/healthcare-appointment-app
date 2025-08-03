import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Doctor.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/${id}`)
      .then(res => setDoctor(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!doctor) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <img src={doctor.profileImage} alt={doctor.name} className="mb-3" style={{ width: "100px" }} />
        <h3>{doctor.name}</h3>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Availability:</strong> {doctor.availability}</p>
        <h5 className="mt-3">Weekly Schedule:</h5>
        <ul className="list-group mb-3">
          {Object.entries(doctor.schedule).map(([day, slot]) => (
            <li key={day} className="list-group-item">{day}: {slot}</li>
          ))}
        </ul>
        <div className="text-center">
  <Link
    to={`/book/${doctor.id}`}
    className="btn btn-success custom-btn"
  >
    Book Appointment
  </Link>
</div>

      </div>
    </div>
  );
};

export default DoctorProfile;
