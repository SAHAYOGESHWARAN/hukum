import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList'; // Component for viewing the list of employees
import CreateEmployee from './components/CreateEmployee'; // Component for adding a new employee
import EditEmployee from './components/EmployeeEdit'; // Component for editing an employee

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard user="Admin" />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
