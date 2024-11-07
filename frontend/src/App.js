import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
    const [user, setUser] = useState(null); // User state for login

    return (
        <Router>
            <div>
                {user ? (
                    // If user is logged in, show dashboard and navigation
                    <>
                        <Dashboard user={user} />
                        <nav>
                            <a href="/">Home</a>
                            <a href="/employees">Employee List</a>
                            <a href="/create">Create Employee</a>
                        </nav>
                        <Routes>
                            <Route path="/" element={<EmployeeList />} />
                            <Route path="/employees" element={<EmployeeList />} />
                            <Route path="/create" element={<CreateEmployee />} />
                        </Routes>
                    </>
                ) : (
                    // If not logged in, show the Login component
                    <Login setUser={setUser} />
                )}
            </div>
        </Router>
    );
}

export default App;
