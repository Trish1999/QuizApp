const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  textvalue: {
    type: String,
  },
  imgvalue: {
    type: String
  },
  optionChoosen: {
    type:Number
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
    },
  optionType: {
    type: String,
    required: true
    },
  options: {
    type: [optionSchema],
    required: true
  },
  answer: {
    type: String,
    required: false
    },
  timer: {
    type: String,
    required: false
    },
  correctAttempt: {
    type: Number,
    required: false
    },
  incorrectAttempt: {
    type: Number,
    required: false
    },
});


const quizSchema = new mongoose.Schema(
    {
        quizName: {
            type: String,
            required: true,
        },
        quizType: {
            type: String,
            required: true,
        },
        questionsNumber: {
            type: Number,
            required: true,
        },
        impression: {
            type: Number,
            required: false,
        },
        questions: {
            type: [questionSchema],
            required: true,
        },
        refUserId: {
            type: mongoose.ObjectId,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Quiz", quizSchema);