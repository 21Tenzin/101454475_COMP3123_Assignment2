const express = require("express");
const User = require("../models/User");

const router = express.Router();
// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ 
        message: "User created successfully",
        user_id: user._id,
     });
  } catch (err) {
    res.status(500).json({ 
        status: false,
        message: "User creation failed",
        error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json({ 
        status: false,
        message: "Invalid email and password" });
    }
    res.status(200).json({ 
        status: true,
        message: "Login successful" });
  } catch (err) {
    res.status(500).json({ 
        status: false,
        message: "Login failed",
        error: err.message });
  }
});

module.exports = router;
