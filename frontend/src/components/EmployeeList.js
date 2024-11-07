import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeRow from './EmployeeRow';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [designation, setDesignation] = useState('');
    const [course, setCourse] = useState('');

    const fetchEmployees = async () => {
        const params = {
            search,
            designation,
            course,
        };
        try {
            const response = await axios.get('http://localhost:5000/api/employees', {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Retrieve token from local storage
                },
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
            if (error.response?.status === 401) {
                window.location.href = '/login';
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [search, designation, course]);

    return (
        <div>
            <h2>Employee List</h2>
            {/* Add search, filter, and table display here */}
        </div>
    );
}

export default EmployeeList;
