const express = require('express');
const router = express.Router();
const Login = require('../models/Login');

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    const user = await Login.findOne({ userName, password });
    
    if (user) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid login details" });
    }
});

module.exports = router;
