import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';

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
    const [isLoading, setIsLoading] = useState(false); // for loading state

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

        // Prepare form data for sending
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // Clear previous messages before sending the request
        setMessage('');
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/api/employees/create', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setMessage('Employee created successfully!');
            } else {
                setMessage(' ' + response.data.message || 'Failed to create employee');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error creating employee');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Create Employee</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleChange}
            />

            <select name="designation" value={formData.designation} onChange={handleChange}>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>

            <label>
                <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === 'M'}
                    onChange={handleChange}
                /> Male
            </label>
            <label>
                <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === 'F'}
                    onChange={handleChange}
                /> Female
            </label>

            <label>
                <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={formData.course.includes('MCA')}
                    onChange={handleCheckboxChange}
                /> MCA
            </label>
            <label>
                <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={formData.course.includes('BCA')}
                    onChange={handleCheckboxChange}
                /> BCA
            </label>
            <label>
                <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={formData.course.includes('BSC')}
                    onChange={handleCheckboxChange}
                /> BSC
            </label>

            <input type="file" name="imgUpload" accept=".jpg,.png" onChange={handleFileChange} />

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Submit'}
            </button>

            {message && <p className={isLoading ? 'loading' : ''}>{message}</p>}
        </form>
    );
}

export default CreateEmployee;
