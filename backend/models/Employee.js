// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String], required: true },
    imgUpload: { type: String },  // Store the image path
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
