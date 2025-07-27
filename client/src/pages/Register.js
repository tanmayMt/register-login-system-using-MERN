import React, { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2>Register</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
