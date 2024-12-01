import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <div>
        <Link to="/employees" style={{ marginRight: "1rem" }}>Employee List</Link>
        <Link to="/employees/add">Add Employee</Link>
      </div>
      <button onClick={handleLogout} style={{ background: "red", color: "white", border: "none", padding: "0.5rem 1rem" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
