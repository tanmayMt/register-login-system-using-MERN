import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
      navigate("/profile");
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2>Login</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
