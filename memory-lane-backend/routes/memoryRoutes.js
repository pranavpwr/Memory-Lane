const express = require("express");
const { addMemory, getMemories, deleteMemory } = require("../controllers/memoryController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/add-memory", protect, upload.single('media'), addMemory);
router.get("/memories", protect, getMemories);
router.delete("/delete/:id", protect, deleteMemory);

module.exports = router;
