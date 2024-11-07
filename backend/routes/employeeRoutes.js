const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee'); // Import the Employee model
const { createEmployee, getEmployees } = require('../controllers/EmployeeController'); // Import functions from the controller

// Setup Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Ensure this directory exists and has write permissions
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on current time
    }
});
const upload = multer({ storage: storage });

// Add new employee
router.post('/create', upload.single('imgUpload'), createEmployee); // Employee creation route

// Get all employees with search and filter options
router.get('/', getEmployees); // Fetch all employees route 

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

module.exports = router;
