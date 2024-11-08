import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user }) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch employee data when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
            } catch (error) {
                setError("Failed to load employees. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleViewEmployeeList = () => navigate('/employees'); // Navigate to Employee List page
    const handleAddNewEmployee = () => navigate('/create'); // Navigate to Create Employee page
    const handleEditEmployee = (id) => navigate(`/edit/${id}`); // Navigate to Edit Employee page

    const handleDeleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`);
                setEmployees(employees.filter(employee => employee._id !== id));
                alert("Employee deleted successfully.");
            } catch (error) {
                alert("Failed to delete employee. Please try again.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                {employees.length > 0 ? (
                    employees.map((employee) => (
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
                            <button
                                onClick={() => handleDeleteEmployee(employee._id)}
                                className="btn delete-btn"
                            >
                                Delete Employee
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No employees found.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
