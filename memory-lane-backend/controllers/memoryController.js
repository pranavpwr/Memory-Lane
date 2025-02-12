const Memory = require("../models/Memory");

const addMemory = async (req, res) => {
    try {
        const { title, description, media } = req.body;
        const newMemory = await Memory.create({
            user: req.user,
            title,
            description,
            media,
        });

        res.status(201).json({ message: "Memory added!", memory: newMemory });
    } catch (error) {
        res.status(500).json({ error: "Failed to add memory" });
    }
};

const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({ user: req.user }).sort({ createdAt: -1 });
        res.json(memories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch memories" });
    }
};

module.exports = { addMemory, getMemories };
