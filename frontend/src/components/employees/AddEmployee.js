import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    date_of_joining: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/emp/employees", employee);
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error.response.data);
      alert("Failed to add employee.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input name="first_name" placeholder="First Name" onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="position" placeholder="Position" onChange={handleChange} required />
      <input name="department" placeholder="Department" onChange={handleChange} required />
      <input name="salary" placeholder="Salary" type="number" onChange={handleChange} required />
      <input name="date_of_joining" placeholder="Date of Joining" type="date" onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddEmployee;
