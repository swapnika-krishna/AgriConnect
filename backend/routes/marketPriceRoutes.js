
const express = require("express");

const router = express.Router();

const {
  getMarketPrices,
  addMarketPrice,
  deleteMarketPrice
} = require("../controllers/marketPriceController");

const { protect } = require("../middleware/authMiddleware");

// Anyone can view market prices
router.get("/", getMarketPrices);

// Logged-in users can add and delete prices
router.post("/", protect, addMarketPrice);
router.delete("/:id", protect, deleteMarketPrice);

module.exports = router;
