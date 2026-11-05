const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    season: {
      type: String,
      required: true
    },

    soilType: {
      type: String,
      required: true
    },

    waterRequirement: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Crop", cropSchema);