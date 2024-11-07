import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ user }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employees').then(response => {
            setEmployees(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Welcome Admin Panel</h2>
            <h3>Welcome, {user}</h3>
            <ul>
                {employees.map(emp => (
                    <li key={emp._id}>{emp.name} - {emp.designation}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
