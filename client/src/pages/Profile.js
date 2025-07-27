import React, { useEffect, useState } from "react";
import API from "../services/api";


function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data.data);
      } catch (err) {
        setMsg("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2>My Profile</h2>
      {msg && <div className="alert alert-danger">{msg}</div>}
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
