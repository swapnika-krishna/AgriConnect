
const express = require("express");
const router = express.Router();

const {
  getQuestions,
  addQuestion,
  answerQuestion,
} = require("../controllers/questionController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Anyone can view questions
router.get("/", getQuestions);

// Anyone can submit a question
router.post("/", addQuestion);

// Only logged-in experts can answer questions
router.put(
  "/:id/answer",
  protect,
  authorize("expert"),
  answerQuestion
);

module.exports = router;
