const express = require("express");
const { addMemory, getMemories } = require("../controllers/memoryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-memory", protect, addMemory);
router.get("/memories", protect, getMemories);

module.exports = router;
