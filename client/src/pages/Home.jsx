import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Doctors</h2>
      <input
        type="text"
        placeholder="Search by name or specialization"
        className="form-control mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filtered.map(doc => (
          <div key={doc.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img src={doc.profileImage} className="card-img-top" alt={doc.name} />
              <div className="card-body">
                <h5 className="card-title">{doc.name}</h5>
                <p className="card-text">{doc.specialization}</p>
                <p><strong>Status:</strong> {doc.availability}</p>
                <Link to={`/doctor/${doc.id}`} className="btn btn-primary">View Profile</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
