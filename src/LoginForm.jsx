import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login.php', {
                username,
                password,
            });
            if (res.data.success) {
                onLogin();
            } else {
                setError(res.data.message || 'Login failed');
            }
        } catch (err) {
            setError('Login error');
        }
    };

    return (
        <Box
            mt={4}
            maxWidth={300}
            mx='auto'
        >
            <Typography variant='h5'>Login</Typography>
            {error && <Typography color='error'>{error}</Typography>}
            <form onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label='Username'
                    margin='normal'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label='Password'
                    type='password'
                    margin='normal'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
}
