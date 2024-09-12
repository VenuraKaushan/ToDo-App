import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Link, Container } from '@mui/material';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to check if the user exists in localStorage
    const authenticateUser = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email && user.password === password);
    };

    //handle login 
    const handleLogin = (e) => {
        e.preventDefault();
    
        // Validate email and password fields
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
    
        // Check user credentials
        const authenticatedUser = authenticateUser(email, password);
    
        if (authenticatedUser) {
            // Login the user by updating the auth state
            login(authenticatedUser);
            navigate('/todos');  // Redirect to Todo List page
        } else {
            setError('Invalid email or password');
        }
    };
    
    return (
        <Container maxWidth="xs">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8,
            }}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}
            <Box component="form" onSubmit={handleLogin} Validate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Link href="/register" variant="body2">
                    {"Don't have an account? Register here"}
                </Link>
            </Box>
        </Box>
    </Container>
    );

};

export default Login;