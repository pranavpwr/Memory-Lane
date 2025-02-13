import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Typography, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card sx={{ p: 4, width: 400, boxShadow: 3 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Welcome Back
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </Box>
    );
};

export default Login;
