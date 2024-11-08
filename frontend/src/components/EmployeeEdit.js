import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeEdit.css'

function EmployeeEdit() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        course: [],
    });

    const { id } = useParams(); // Get employee ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the employee data when the component mounts
        axios
            .get(`http://localhost:5000/api/employees/${id}`)
            .then((response) => {
                const employee = response.data;
                setFormData({
                    name: employee.name,
                    email: employee.email,
                    mobile: employee.mobile,
                    designation: employee.designation,
                    gender: employee.gender,
                    course: employee.course,
                });
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedCourses = checked
            ? [...formData.course, value]
            : formData.course.filter((course) => course !== value);
        setFormData({ ...formData, course: updatedCourses });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send updated data to the server
            await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
            navigate('/employees'); // Redirect back to the employee list page
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="employee-edit-container">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            checked={formData.gender === 'M'}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={formData.gender === 'F'}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>
                <div>
                    <label>Courses:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            checked={formData.course.includes('MCA')}
                            onChange={handleCheckboxChange}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            checked={formData.course.includes('BCA')}
                            onChange={handleCheckboxChange}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            checked={formData.course.includes('BSC')}
                            onChange={handleCheckboxChange}
                        />
                        BSC
                    </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EmployeeEdit;
