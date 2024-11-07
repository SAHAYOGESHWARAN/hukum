import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { userName, password });
            alert(response.data.message);
            setUser(userName);
        } catch (error) {
            alert('Invalid login details');
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <input placeholder="User Name" onChange={e => setUserName(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
