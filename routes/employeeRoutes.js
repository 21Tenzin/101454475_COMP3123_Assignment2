const express = require("express");
const EmployeeModel = require("../models/Employee");
const routes = express.Router();

// Get All Employees 
routes.get("/employees", async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        console.log(employees);
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// Create New Employee 
routes.post("/employees", async (req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = new EmployeeModel(employeeData);
        const savedEmployee = await newEmployee.save();
        res.status(201).send(savedEmployee);
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// Get Employee by ID 
routes.get("/employees/:eid", async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.eid);
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send({
                status: false,
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// Update Employee by ID 
routes.put("/employees/:eid", async (req, res) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            req.params.eid,
            req.body,
            { new: true }
        );
        if (updatedEmployee) {
            res.status(200).send(updatedEmployee);
        } else {
            res.status(404).send({
                status: false,
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

// Delete Employee by ID 
routes.delete("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid; // Extract eid from route parameters
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);
        if (deletedEmployee) {
            res.status(204).send({
                message: "Employee deleted successfully",
            }); // No Content on success
        } else {
            res.status(404).send({
                status: false,
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
});

module.exports = routes;
