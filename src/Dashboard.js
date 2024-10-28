import React from 'react';

function Dashboard({ checkLogout }) {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to hospital dashboard</p>
            <button onClick={checkLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
