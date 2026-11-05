
const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true
    },

    marketName: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    pricePerQuintal: {
      type: Number,
      required: true,
      min: 0
    },

    priceDate: {
      type: Date,
      default: Date.now
    },

    source: {
      type: String,
      default: "Demo Data"
    },

    isDemo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MarketPrice", marketPriceSchema);
