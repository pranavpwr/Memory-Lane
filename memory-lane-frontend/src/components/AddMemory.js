import { useState } from "react";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { addMemory } from "../api";

const AddMemory = ({ onMemoryAdded }) => {
    const [memory, setMemory] = useState({ title: "", description: "" });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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
        } catch (error) {
            alert("Failed to add memory");
        }
        setLoading(false);
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
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ alignSelf: "flex-start" }}
                        >
                            {loading ? "Adding..." : "Add Memory"}
                        </Button>
                    </Box>
                </form>
            </Card>
        </motion.div>
    );
};

export default AddMemory;
