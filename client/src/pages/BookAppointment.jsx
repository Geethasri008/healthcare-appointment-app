import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      setError("Please fill all fields correctly.");
      return;
    }

    axios.post("http://localhost:5000/api/appointments", {
      ...form,
      doctorId: id
    })
      .then(res => {
        setSuccess(res.data.message);
        setError('');
        setForm({ name: '', email: '', date: '', time: '' });
      })
      .catch(err => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="container mt-4">
      <h3>Book Appointment</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
        />
    <button
  className="btn btn-primary mt-2 px-4 py-2 d-inline-block"
  type="submit"
>
  Confirm Appointment
</button>

      </form>
    </div>
  );
};

export default BookAppointment;
