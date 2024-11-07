const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add new employee
router.post('/create', async (req, res) => {
    const { name, email, mobile, designation, gender, course, imgUpload } = req.body;

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        imgUpload,
    });

    try {
        await employee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee" });
    }
});

module.exports = router;
