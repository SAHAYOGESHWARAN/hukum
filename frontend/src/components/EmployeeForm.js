
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        img: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                course: checked
                    ? [...prevData.course, value]
                    : prevData.course.filter((course) => course !== value),
            }));
        } else if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, img: e.target.files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'course') {
                data.append(key, formData[key].join(','));
            } else {
                data.append(key, formData[key]);
            }
        }
        try {
            await axios.post('http://localhost:5000/employees', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Employee added successfully');
        } catch (error) {
            alert(error.response?.data || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required />

            <label>Mobile No:</label>
            <input type="text" name="mobile" onChange={handleChange} required pattern="\d+" />

            <label>Designation:</label>
            <select name="designation" onChange={handleChange} required>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>

            <label>Gender:</label>
            <input type="radio" name="gender" value="M" onChange={handleChange} required /> Male
            <input type="radio" name="gender" value="F" onChange={handleChange} required /> Female

            <label>Course:</label>
            <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
            <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
            <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC

            <label>Image Upload:</label>
            <input type="file" name="img" accept=".jpg,.png" onChange={handleChange} required />

            <button type="submit">Update</button>
        </form>
    );
};

export default EmployeeForm;
