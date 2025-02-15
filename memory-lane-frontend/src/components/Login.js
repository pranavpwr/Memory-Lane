import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { 
    Container, Box, Typography, TextField, Button, Paper,
    Avatar, CircularProgress, Alert, Fade
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { motion } from "framer-motion";
import { theme } from "../theme";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Basic validation
        if (!form.email || !form.password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await login(form);
            if (response.success && response.token) {
                localStorage.setItem("token", response.token);
                navigate("/dashboard");
            } else {
                setError(response.error || "Login failed");
            }
        } catch (error) {
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in to Memory Lane
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
                            {loading ? <CircularProgress size={24} /> : "Sign In"}
                        </Button>
                        <Typography variant="body2" align="center">
                            Don't have an account?{' '}
                            <Link to="/" style={{ color: 'primary.main' }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
};

export default Login;
