// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div>
                {user ? (
                    <>
                        <Dashboard user={user} />
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/employees">Employee List</Link>
                            <Link to="/create">Create Employee</Link>
                        </nav>
                        <Routes>
                            <Route path="/" element={<EmployeeList />} />
                            <Route path="/employees" element={<EmployeeList />} />
                            <Route path="/create" element={<CreateEmployee />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                )}
                {!user && <Link to="/register">Register</Link>}
            </div>
        </Router>
    );
}

export default App;
