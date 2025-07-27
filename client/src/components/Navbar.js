import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MERN Auth</Link>
        <div>
          {localStorage.getItem("token") ? (
            <>
              <Link to="/profile" className="btn btn-outline-light me-2">Profile</Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-success">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
