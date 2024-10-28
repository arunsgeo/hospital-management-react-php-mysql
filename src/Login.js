import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['session']);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        
        e.preventDefault();
        try {
            const result = await fetch('http://localhost/excercise/react/hosp-mngt/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const resultData = await result.json();

            if (resultData.success) {
                setCookie('session', resultData.session_id, { path: '/' });
                setIsAuthenticated(true);
            } else {
                setMessage(resultData.message || 'Login failed.');
            }
        } catch (error) {
            setMessage('Server not connected');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Enter the email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Enter the password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;