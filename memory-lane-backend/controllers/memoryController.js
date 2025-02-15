const Memory = require("../models/Memory");
const cloudinary = require('../config/cloudinary');
const fs = require('fs').promises;
const addMemory = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('File:', req.file);
        
        const { title, description } = req.body;
        const file = req.file;

        let mediaData = {};
        if (file) {
            try {
                console.log('Attempting to upload to Cloudinary...');
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'memories',
                    resource_type: 'auto'
                });
                console.log('Cloudinary upload result:', result);
                
                await fs.unlink(file.path);
                
                mediaData = {
                    url: result.secure_url,
                    public_id: result.public_id,
                    resource_type: result.resource_type
                };
            } catch (uploadError) {
                console.error('Cloudinary upload error details:', uploadError);
                throw new Error('Failed to upload media: ' + uploadError.message);
            }
        }
        const newMemory = await Memory.create({
            user: req.user,
            title,
            description,
            media: mediaData
        });

        res.status(201).json({
            success: true,
            message: "Memory added successfully",
            memory: newMemory
        });
    } catch (error) {
        console.error('Error adding memory:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to add memory"
        });
    }
};

const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({ user: req.user })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            message: "Memories retrieved successfully",
            memories
        });
    } catch (error) {
        console.error('Error fetching memories:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to fetch memories"
        });
    }
};

const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ 
                success: false,
                error: "Memory not found" 
            });
        }

        if (memory.user.toString() !== req.user) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to delete this memory"
            });
        }

        if (memory.media?.public_id) {
            await cloudinary.uploader.destroy(memory.media.public_id);
        }

        await Memory.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Memory deleted successfully"
        });
    } catch (error) {
        console.error('Delete memory error:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to delete memory"
        });
    }
};

module.exports = { addMemory, getMemories, deleteMemory };