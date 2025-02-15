import { Box, Container, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { AddPhotoAlternate, Timeline, Notifications } from "@mui/icons-material";
import AddMemory from "../components/AddMemory";
import Memories from "../components/Memories";

const Dashboard = () => {
    const statsCards = [
        {
            icon: <AddPhotoAlternate sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: "Add Memories",
            description: "Capture your special moments"
        },
        {
            icon: <Timeline sx={{ fontSize: 40, color: 'secondary.main' }} />,
            title: "Timeline View",
            description: "View your memory journey"
        },
        {
            icon: <Notifications sx={{ fontSize: 40, color: 'success.main' }} />,
            title: "Daily Reminders",
            description: "Never miss a memory"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4, 
                            mb: 4, 
                            background: 'linear-gradient(45deg, #2196f3 30%, #ff4081 90%)',
                            color: 'white',
                            borderRadius: 3
                        }}
                    >
                        <Typography 
                            variant="h3" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 600,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Memory Dashboard
                        </Typography>
                        <Typography variant="h6">
                            Create and cherish your memories
                        </Typography>
                    </Paper>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {statsCards.map((card, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card 
                                        sx={{ 
                                            height: '100%',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ 
                                            textAlign: 'center',
                                            p: 3
                                        }}>
                                            {card.icon}
                                            <Typography 
                                                variant="h6" 
                                                sx={{ mt: 2, mb: 1 }}
                                            >
                                                {card.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <AddMemory onMemoryAdded={() => window.location.reload()} />
                    <Memories />
                </Box>
            </Container>
        </motion.div>
    );
};

export default Dashboard;
