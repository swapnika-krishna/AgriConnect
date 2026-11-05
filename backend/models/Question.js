
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
      trim: true
    },

    question: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    answer: {
      type: String,
      default: ""
    },

    expertName: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Question", questionSchema);
