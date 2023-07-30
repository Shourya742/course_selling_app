const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (res, req) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exist" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created Successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
});

module.exports = router;
