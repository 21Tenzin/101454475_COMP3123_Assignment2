import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: "", position: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const fetchEmployees = async () => {
    try {
      const query = new URLSearchParams();
      if (search.department) query.append("department", search.department);
      if (search.position) query.append("position", search.position);

      const response = await axios.get(
        `http://localhost:5000/api/v1/emp/employees/search?${query.toString()}`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`);
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Employee List</h2>
      <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Department"
            variant="outlined"
            size="small"
            name="department"
            value={search.department}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Position"
            variant="outlined"
            size="small"
            name="position"
            value={search.position}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{`${emp.first_name} ${emp.last_name}`}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/employees/${emp._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeeList;
