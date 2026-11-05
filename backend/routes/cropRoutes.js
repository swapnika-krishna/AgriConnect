const express = require("express");

const {
  createCrop,
  getCrops,
  updateCrop,
  deleteCrop
} = require("../controllers/cropController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Anyone can view crops
router.get("/", getCrops);

// Logged-in users can manage crops
router.post("/", protect, createCrop);
router.put("/:id", protect, updateCrop);
router.delete("/:id", protect, deleteCrop);

module.exports = router;