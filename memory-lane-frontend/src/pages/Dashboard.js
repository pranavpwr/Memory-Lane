import { Box, Container, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import AddMemory from "../components/AddMemory";
import Memories from "../components/Memories";
import { pageTransition } from '../animations/index';

const Dashboard = () => {
    return (
        <motion.div {...pageTransition}>
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 3, 
                            mb: 4, 
                            background: 'linear-gradient(45deg, #2196f3 30%, #ff4081 90%)',
                            color: 'white'
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            Memory Dashboard
                        </Typography>
                        <Typography variant="h6">
                            Create and cherish your memories
                        </Typography>
                    </Paper>
                    <AddMemory onMemoryAdded={() => window.location.reload()} />
                    <Memories />
                </Box>
            </Container>
        </motion.div>
    );
};

export default Dashboard;
