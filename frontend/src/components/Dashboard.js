import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user }) {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Fetch employee data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/employees').then((response) => {
            setEmployees(response.data);
        });
    }, []);

    const handleViewEmployeeList = () => {
        navigate('/employees'); // Navigate to Employee List page
    };

    const handleAddNewEmployee = () => {
        navigate('/create'); // Navigate to Create Employee page
    };

    const handleEditEmployee = (id) => {
        navigate(`/edit/${id}`); // Navigate to Edit Employee page
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to the Admin Panel</h2>
            <h3>Welcome, {user}</h3>
            <div className="home-actions">
                <button onClick={handleViewEmployeeList} className="btn">
                    View Employee List
                </button>
                <button onClick={handleAddNewEmployee} className="btn">
                    Add New Employee
                </button>
            </div>

            <h3>Employee List</h3>
            <div className="employee-list">
                {employees.map((employee) => (
                    <div key={employee._id} className="employee-item">
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Designation:</strong> {employee.designation}</p>
                        <p><strong>Mobile:</strong> {employee.mobile}</p>
                        <button
                            onClick={() => handleEditEmployee(employee._id)}
                            className="btn edit-btn"
                        >
                            Edit Employee
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
