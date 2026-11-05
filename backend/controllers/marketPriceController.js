
const MarketPrice = require("../models/MarketPrice");

// Get all market prices
const getMarketPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({ priceDate: -1 });

    res.status(200).json({
      success: true,
      count: prices.length,
      prices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add a new market price
const addMarketPrice = async (req, res) => {
  try {
    const {
      cropName,
      marketName,
      location,
      pricePerQuintal
    } = req.body;

    if (!cropName || !marketName || !location ||
        pricePerQuintal === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const newPrice = await MarketPrice.create({
      cropName,
      marketName,
      location,
      pricePerQuintal,
      source: "Demo Data",
      isDemo: true
    });

    res.status(201).json({
      success: true,
      message: "Market price added successfully",
      price: newPrice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a market price
const deleteMarketPrice = async (req, res) => {
  try {
    const deletedPrice = await MarketPrice.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPrice) {
      return res.status(404).json({
        success: false,
        message: "Market price not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Market price deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMarketPrices,
  addMarketPrice,
  deleteMarketPrice
};
