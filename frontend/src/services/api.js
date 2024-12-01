import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (data) => API.post("/user/login", data);
export const signupUser = (data) => API.post("/user/signup", data);
export const getEmployees = () => API.get("/emp/employees");
export const getEmployeeById = (id) => API.get(`/emp/employees/${id}`);
export const createEmployee = (data) => API.post("/emp/employees", data);
export const updateEmployee = (id, data) => API.put(`/emp/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/emp/employees/${id}`);
