import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        if (!userName || !password) {
            setMessage('Username and Password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { userName, password });
            if (response.data.success) {
                alert(response.data.message);
                // Optionally redirect after successful registration
                // window.location.href = "/login";
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <input 
                placeholder="User Name" 
                value={userName} 
                onChange={e => setUserName(e.target.value)} 
            />
            <input 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
