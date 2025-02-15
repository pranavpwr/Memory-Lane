import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { PhotoLibrary, Email, CloudUpload, Timer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
    >
        <Paper
            elevation={2}
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2
            }}
        >
            {icon}
            <Typography variant="h6" sx={{ my: 2 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    </motion.div>
);

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <PhotoLibrary sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: "Store Memories",
            description: "Upload and organize your precious moments with photos and descriptions"
        },
        {
            icon: <Email sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: "Daily Reminders",
            description: "Get gentle reminders to capture today's special moments"
        },
        {
            icon: <Timer sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: "On This Day",
            description: "Rediscover memories from your past on their anniversaries"
        },
        {
            icon: <CloudUpload sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: "Cloud Storage",
            description: "Safely store your memories in the cloud, accessible anywhere"
        }
    ];

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container>
                <Box sx={{ pt: 8, pb: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                        >
                            Memory Lane
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                            sx={{ mb: 4 }}
                        >
                            Your personal journey through time. Capture, preserve, and relive your precious moments.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 8 }}>
                            <Button 
                                variant="contained" 
                                size="large"
                                onClick={() => navigate('/register')}
                            >
                                Get Started
                            </Button>
                            <Button 
                                variant="outlined" 
                                size="large"
                                onClick={() => navigate('/login')}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </motion.div>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <FeatureCard {...feature} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: 8, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            How It Works
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            1. Sign up for your free account<br />
                            2. Upload your memories with photos and descriptions<br />
                            3. Receive daily reminders to capture new moments<br />
                            4. Get notifications about memories from your past
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;