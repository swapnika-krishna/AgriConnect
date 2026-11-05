const Crop = require("../models/Crop");

// CREATE
const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create(req.body);

    res.status(201).json({
      success: true,
      message: "Crop added successfully",
      crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ
const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: crops.length,
      crops
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCrop,
  getCrops,
  updateCrop,
  deleteCrop
};