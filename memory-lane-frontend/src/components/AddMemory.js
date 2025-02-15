import { useState, useRef } from "react";
import { 
    Card, TextField, Button, Box, Typography, IconButton,
    CircularProgress, Paper, Fade
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { addMemory } from "../api";

const AddMemory = ({ onMemoryAdded }) => {
    const [memory, setMemory] = useState({ title: "", description: "" });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', memory.title);
            formData.append('description', memory.description);
            if (file) {
                formData.append('media', file);
            }

            await addMemory(formData);
            onMemoryAdded();
            setMemory({ title: "", description: "" });
            setFile(null);
            setPreview(null);
        } catch (error) {
            alert("Failed to add memory");
        }
        setLoading(false);
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        fileInputRef.current.value = '';
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card 
                sx={{ 
                    p: 3, 
                    mb: 4,
                    background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
                }}
            >
                <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main',
                        fontWeight: 600
                    }}
                >
                    <AddPhotoAlternate />
                    Add New Memory
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Title"
                            value={memory.title}
                            onChange={(e) => setMemory({ ...memory, title: e.target.value })}
                            required
                            variant="outlined"
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={memory.description}
                            onChange={(e) => setMemory({ ...memory, description: e.target.value })}
                            required
                            variant="outlined"
                        />
                        
                        <Box sx={{ mt: 2 }}>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                id="memory-media-input"
                            />
                            <label htmlFor="memory-media-input">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<AddPhotoAlternate />}
                                >
                                    Add Media
                                </Button>
                            </label>
                            
                            {preview && (
                                <Fade in>
                                    <Paper 
                                        sx={{ 
                                            mt: 2, 
                                            p: 1, 
                                            position: 'relative',
                                            width: 'fit-content'
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={clearFile}
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: -10,
                                                bgcolor: 'background.paper',
                                                boxShadow: 1,
                                                '&:hover': { bgcolor: 'error.light', color: 'white' }
                                            }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                        <img 
                                            src={preview} 
                                            alt="Preview" 
                                            style={{ 
                                                maxWidth: '200px', 
                                                maxHeight: '200px',
                                                borderRadius: '4px'
                                            }} 
                                        />
                                    </Paper>
                                </Fade>
                            )}
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ 
                                alignSelf: "flex-start",
                                mt: 2,
                                px: 4,
                                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Add Memory"
                            )}
                        </Button>
                    </Box>
                </form>
            </Card>
        </motion.div>
    );
};

export default AddMemory;
