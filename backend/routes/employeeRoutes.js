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

// Get all employees with search and filter options
router.get('/', async (req, res) => {
    const { search = '', designation, course } = req.query;
    const filter = {};

    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }
    if (designation) {
        filter.designation = designation;
    }
    if (course) {
        filter.course = course;
    }

    try {
        const employees = await Employee.find(filter);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

module.exports = router;
