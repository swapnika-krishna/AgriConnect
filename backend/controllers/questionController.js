
const Question = require("../models/Question");

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Submit a farmer question
const addQuestion = async (req, res) => {
  try {
    const { farmerName, question, category } = req.body;

    if (!farmerName || !question || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const newQuestion = await Question.create({
      farmerName,
      question,
      category
    });

    res.status(201).json({
      success: true,
      message: "Question submitted successfully",
      question: newQuestion
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Expert answers a question
const answerQuestion = async (req, res) => {
  try {
    const { answer, expertName } = req.body;

    if (!answer || !expertName) {
      return res.status(400).json({
        success: false,
        message: "Please provide answer and expert name"
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        answer,
        expertName,
        status: "Answered"
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      question: updatedQuestion
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getQuestions,
  addQuestion,
  answerQuestion
};
