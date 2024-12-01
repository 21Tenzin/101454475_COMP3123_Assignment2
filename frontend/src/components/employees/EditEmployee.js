import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employee);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error.response.data);
      alert("Failed to update employee.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
      <input name="first_name" value={employee.first_name} onChange={handleChange} required />
      <input name="last_name" value={employee.last_name} onChange={handleChange} required />
      <input name="email" value={employee.email} onChange={handleChange} required />
      <input name="position" value={employee.position} onChange={handleChange} required />
      <input name="department" value={employee.department} onChange={handleChange} required />
      <input name="salary" value={employee.salary} type="number" onChange={handleChange} required />
      <input
        name="date_of_joining"
        value={employee.date_of_joining}
        type="date"
        onChange={handleChange}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditEmployee;
