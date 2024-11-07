
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { userName, password });
            alert(response.data.message);
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="User Name" onChange={e => setUserName(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
