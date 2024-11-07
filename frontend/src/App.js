import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
            <CreateEmployee />
        </div>
    );
}

export default App;
