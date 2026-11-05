
const express = require("express");

const router = express.Router();

const {
  getMarketPrices,
  addMarketPrice,
  deleteMarketPrice
} = require("../controllers/marketPriceController");

// GET all market prices
router.get("/", getMarketPrices);

// POST a new market price
router.post("/", addMarketPrice);

// DELETE a market price
router.delete("/:id", deleteMarketPrice);

module.exports = router;
