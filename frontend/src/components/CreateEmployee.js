import React, { useState } from 'react';
import axios from 'axios';

function CreateEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        course: [],
        imgUpload: null,
    });
    const [message, setMessage] = useState('');

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, imgUpload: e.target.files[0] });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedCourses = checked
            ? [...formData.course, value]
            : formData.course.filter((course) => course !== value);
        setFormData({ ...formData, course: updatedCourses });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!formData.name || !formData.email || !formData.mobile || !formData.gender) {
            setMessage('All fields are required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Invalid email');
            return;
        }
        if (!/^\d+$/.test(formData.mobile)) {
            setMessage('Invalid mobile number');
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/employees/create', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.error || 'Error creating employee');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Create Employee</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="mobile" placeholder="Mobile No" onChange={handleChange} />

            <select name="designation" onChange={handleChange}>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>

            <label>
                <input type="radio" name="gender" value="M" onChange={handleChange} /> Male
            </label>
            <label>
                <input type="radio" name="gender" value="F" onChange={handleChange} /> Female
            </label>

            <label>
                <input type="checkbox" name="course" value="MCA" onChange={handleCheckboxChange} /> MCA
            </label>
            <label>
                <input type="checkbox" name="course" value="BCA" onChange={handleCheckboxChange} /> BCA
            </label>
            <label>
                <input type="checkbox" name="course" value="BSC" onChange={handleCheckboxChange} /> BSC
            </label>

            <input type="file" name="imgUpload" accept=".jpg,.png" onChange={handleFileChange} />

            <button type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default CreateEmployee;
