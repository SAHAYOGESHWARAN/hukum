import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeRow from './EmployeeRow';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [designation, setDesignation] = useState('');
    const [course, setCourse] = useState('');

    // Fetch employees
    const fetchEmployees = async () => {
        const params = {
            search,
            designation,
            course,
        };
        try {
            const response = await axios.get('http://localhost:5000/api/employees', { params });
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [search, designation, course]);

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Failed to delete employee', error);
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Search Keyword"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="BCA">BCA</option>
                    <option value="BSC">BSC</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <EmployeeRow
                            key={employee._id}
                            employee={employee}
                            onDelete={() => handleDelete(employee._id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
