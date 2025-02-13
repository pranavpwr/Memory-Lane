import { useEffect, useState } from "react";
import { getMemories, deleteMemory } from "../api";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "framer-motion";

const Memories = () => {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMemories = async () => {
        try {
            const response = await getMemories();
            if (response.data.success) {
                setMemories(response.data.memories);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching memories:', err);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!memories?.length) return <div>No memories found</div>;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Memories
            </Typography>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Grid container spacing={3}>
                    {memories.map((memory) => (
                        <Grid item xs={12} sm={6} md={4} key={memory._id}>
                            <motion.div variants={item}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    {memory.media?.url && (
                                        memory.media.resource_type === 'video' ? (
                                            <CardMedia
                                                component="video"
                                                height="200"
                                                src={memory.media.url}
                                                controls
                                            />
                                        ) : (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={memory.media.url}
                                                alt={memory.title}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                        )
                                    )}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Typography variant="h6" gutterBottom>
                                                {memory.title}
                                            </Typography>
                                            <IconButton 
                                                onClick={() => handleDelete(memory._id)}
                                                size="small"
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {memory.description}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {new Date(memory.createdAt).toLocaleDateString()}
                                        </Typography>
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
