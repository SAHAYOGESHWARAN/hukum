
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    // Fetch employees
    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees', error);
            });
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.course.join(', ')}</td>
                            <td>{emp.imgUpload && <img src={`http://localhost:5000/${emp.imgUpload}`} alt="Employee" width="50" />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
