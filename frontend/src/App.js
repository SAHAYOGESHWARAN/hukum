import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Dashboard component
import EmployeeList from './components/EmployeeList'; // Employee list component
import EmployeeEdit from './components/EmployeeEdit'; // Employee Edit component
import CreateEmployee from './components/CreateEmployee'; // Component to create a new employee
import Login from './components/Login'; // Login component
import Register from './components/Register'; // Register component

function App() {
    const [user, setUser] = useState(null); // State to track logged-in user

    return (
        <Router>
            <div>
                {/* Show the dashboard and employee routes if the user is logged in */}
                {user ? (
                    <>
                        <Dashboard user={user} />
                        <Routes>
                            <Route path="/employees" element={<EmployeeList />} />
                            <Route path="/create" element={<CreateEmployee />} />
                            <Route path="/edit/:id" element={<EmployeeEdit />} />
                        </Routes>
                    </>
                ) : (
                    // If the user is not logged in, show login and register routes
                    <Routes>
                        <Route path="/" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                )}

                {/* Show the register link if the user is not logged in */}
                {!user && (
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
