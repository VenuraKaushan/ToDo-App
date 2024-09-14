import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Link, Container } from '@mui/material';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveUser = (newUser) => {
        register(newUser)
    };

    const isEmailRegistered = (email) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email);
    };

    const handleRegister = (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
    
        if (isEmailRegistered(email)) {
            setError('This email is already registered');
            return;
        }
    
        // Call the register function, which already logs the user in
        register(name, email, password);
        
        // Navigate to the '/todos' page after successful registration
        navigate('/todos');
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
                    Register
                </Typography>
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleRegister} Validate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        Register
                    </Button>
                    <Link href="/login" variant="body2">
                        {"Already have an account? Login here"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
