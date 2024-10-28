import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookies, , removeCookie] = useCookies(['session']);

    useEffect(() => {
        // Check if user is authenticated
        if (cookies.session) {
            fetch('http://localhost/excercise/react/hosp-mngt/session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session_id: cookies.session })
            })
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(data.success);
            });
        }
    }, [cookies.session]);

    const checkLogout = () => {
        removeCookie('session', { path: '/' });
        setIsAuthenticated(false);
    };

    return (
        <div>
            {isAuthenticated ? (
                <Dashboard checkLogout={checkLogout} />
                // <Dashboard/>
                // <h2>Yes</h2>
            ) : (
                // <h2>No</h2>
                <Login setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
}

export default App;
