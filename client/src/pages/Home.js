import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="mb-4">Welcome to MERN Auth System</h1>
      <p className="lead">A secure login and registration system using React, Node, and MongoDB.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-success me-3">Login</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>
      </div>
    </div>
  );
};

export default Home;