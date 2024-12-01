import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EmployeeList from "./components/employees/EmployeeList";
import AddEmployee from "./components/employees/AddEmployee";
import EditEmployee from "./components/employees/EditEmployee";
import EmployeeDetails from "./components/employees/EmployeeDetails";
import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
