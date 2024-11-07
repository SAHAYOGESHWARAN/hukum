import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add your styling if needed

function Dashboard({ user }) {
    const [employees, setEmployees] = useState([]);

    // Fetch employee data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/employees').then((response) => {
            setEmployees(response.data);
        });
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Welcome to the Admin Panel</h2>
            <h3>Welcome, {user}</h3>
            <div className="home-actions">
                <Link to="/employees" className="btn">
                    View Employee List
                </Link>
                <Link to="/create" className="btn">
                    Add New Employee
                </Link>
            </div>

    
        </div>
    );
}

export default Dashboard;
