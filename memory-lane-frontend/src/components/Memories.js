import { useEffect, useState } from "react";
import { getMemories, deleteMemory } from "../api";
import { 
    Grid, Card, CardContent, CardMedia, Typography, IconButton, 
    Box, Skeleton, Alert, Fade, Chip
} from "@mui/material";
import { Delete, Event, Image } from "@mui/icons-material";
import { motion } from "framer-motion";

const Memories = () => {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMemories = async () => {
        try {
            const response = await getMemories();
            if (response.success) {
                setMemories(response.memories);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                // Handle by API interceptor
                return;
            }
            setError("Failed to fetch memories. Please try again later.");
            console.error('Error fetching memories:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMemories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMemory(id);
            await fetchMemories();
        } catch (error) {
            alert("Failed to delete memory");
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3].map((skeleton) => (
                    <Grid item xs={12} sm={6} md={4} key={skeleton}>
                        <Skeleton variant="rectangular" height={200} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <Fade in>
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            </Fade>
        );
    }

    if (!memories?.length) {
        return (
            <Fade in>
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        color: 'text.secondary'
                    }}
                >
                    <Image sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6">No memories yet</Typography>
                    <Typography variant="body2">
                        Start adding your precious moments!
                    </Typography>
                </Box>
            </Fade>
        );
    }

    return (
        <Box sx={{ py: 4 }}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Grid container spacing={3}>
                    {memories.map((memory) => (
                        <Grid item xs={12} sm={6} md={4} key={memory._id}>
                            <motion.div variants={item}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                >
                                    {memory.imageUrl && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={memory.imageUrl}
                                            alt={memory.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'flex-start',
                                            mb: 2
                                        }}>
                                            <Typography variant="h6" component="h2">
                                                {memory.title}
                                            </Typography>
                                            <IconButton 
                                                onClick={() => handleDelete(memory._id)}
                                                size="small"
                                                color="error"
                                                sx={{ 
                                                    opacity: 0.6,
                                                    '&:hover': { opacity: 1 }
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            {memory.description}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <Event fontSize="small" color="action" />
                                            <Chip
                                                label={new Date(memory.createdAt).toLocaleDateString()}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
};

export default Memories;
