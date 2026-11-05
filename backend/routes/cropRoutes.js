const express = require("express");

const {
  createCrop,
  getCrops,
  updateCrop,
  deleteCrop
} = require("../controllers/cropController");

const router = express.Router();

router.post("/", createCrop);

router.get("/", getCrops);

router.put("/:id", updateCrop);

router.delete("/:id", deleteCrop);

module.exports = router;