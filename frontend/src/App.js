import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList'; // Employee list component
import CreateEmployee from './components/CreateEmployee'; // Component to create a new employee
import Login from './components/Login'; // Login component
import Register from './components/Register'; // Register component
import Dashboard from './components/Dashboard'; // Dashboard component

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div>
                {/* If user is logged in, show dashboard and routes for employees */}
                {user ? (
                    <>
                        <Dashboard user={user} />
                       
                        <Routes>
                            <Route path="/employees" element={<EmployeeList />} />
                            <Route path="/create" element={<CreateEmployee />} />
                        </Routes>
                    </>
                ) : (
                    // If user is not logged in, show login and registration routes
                    <Routes>
                        <Route path="/" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                )}
                
                {/* Show the register link if the user is not logged in */}
                {!user && <Link to="/register">Register</Link>}
            </div>
        </Router>
    );
}

export default App;
