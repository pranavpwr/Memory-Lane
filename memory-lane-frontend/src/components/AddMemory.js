import { useState } from "react";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { addMemory } from "../api";

const AddMemory = ({ onMemoryAdded }) => {
    const [memory, setMemory] = useState({ title: "", description: "", media: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMemory(memory);
            onMemoryAdded();
            setMemory({ title: "", description: "", media: "" });
        } catch (error) {
            alert("Failed to add memory");
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Memory
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Title"
                            value={memory.title}
                            onChange={(e) => setMemory({ ...memory, title: e.target.value })}
                            required
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={memory.description}
                            onChange={(e) => setMemory({ ...memory, description: e.target.value })}
                            required
                        />
                        <TextField
                            label="Image/Video URL"
                            value={memory.media}
                            onChange={(e) => setMemory({ ...memory, media: e.target.value })}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ alignSelf: "flex-start" }}
                        >
                            Add Memory
                        </Button>
                    </Box>
                </form>
            </Card>
        </motion.div>
    );
};

export default AddMemory;
