import { useState } from "react";
import { register } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { 
    Container, Box, Typography, TextField, Button, Paper,
    Avatar, CircularProgress, Alert, Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from "framer-motion";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Basic validation
        if (!form.name || !form.email || !form.password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await register(form);
            if (response.success) {
                navigate("/login");
            } else {
                setError(response.error || "Registration failed");
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Your Account
                    </Typography>

                    {error && (
                        <Fade in>
                            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Sign Up"}
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: 'primary.main' }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
};

export default Register;
