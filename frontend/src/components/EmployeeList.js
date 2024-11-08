import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeEdit from './EmployeeEdit';  // Import the new EmployeeEdit component
import './EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees', error);
            });
    }, []);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
                setEmployees(employees.filter(emp => emp._id !== employeeId));
                setMessage('Employee deleted successfully!');
            } catch (error) {
                setMessage('Error deleting employee: ' + error.message);
            }
        }
    };

    const handleSave = (updatedEmployee) => {
        setEmployees(employees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
        setEditingEmployee(null);
        setMessage('Employee updated successfully!');
    };

    const handleCancel = () => {
        setEditingEmployee(null);
    };

    return (
        <div>
            <h2>Employee List</h2>
            {editingEmployee ? (
                <EmployeeEdit employee={editingEmployee} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
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
                                <th>Actions</th>
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
                                    <td>
                                        <button onClick={() => handleEdit(emp)}>Edit</button>
                                        <button onClick={() => handleDelete(emp._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {message && <p>{message}</p>}
                </>
            )}
        </div>
    );
}

export default EmployeeList;
