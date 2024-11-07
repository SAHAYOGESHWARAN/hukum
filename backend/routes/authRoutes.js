const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model is used for both registration and login
require('dotenv').config();

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { userName, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ userName, password: hashedPassword });
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with success message and token
        res.status(201).json({ success: true, message: 'Registration successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Find the user by userName
        const user = await User.findOne({ userName });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid login details' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate a JWT token on successful login
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, message: 'Login successful', token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid login details' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

module.exports = router;
