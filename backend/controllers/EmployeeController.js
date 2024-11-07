// controllers/employeeController.js
const Employee = require('../models/Employee');  // Import the Employee model

// Create Employee function
const createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const imgUpload = req.file ? req.file.path : null; // Ensure the image file is handled if uploaded

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
        imgUpload,  // Path to the uploaded image
    });

    try {
        await employee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee", details: error.message });
    }
};

// Get all employees with search and filter options
const getEmployees = async (req, res) => {
    const { search = '', designation, course } = req.query;
    const filter = {};

    if (search) {
        filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
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
        res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
    }
};

module.exports = { createEmployee, getEmployees };
