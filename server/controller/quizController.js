const Quiz = require("../models/quiz");
const mongoose=require("mongoose")

const createQuiz= async (req, res, next) => {
    try {
        const {
            quizName,
            quizType,
            questionsNumber,
            questions
        } = req.body;

        if (
            !quizName ||
            !quizType ||
            !questionsNumber ||
            !questions 
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;

        const quizDetails = new Quiz({
            quizName,
            quizType,
            questionsNumber,
            questions,
            impression:0,
            refUserId: userId,
        });

        const savedQuiz = await quizDetails.save();
        res.json({ quizId: savedQuiz._id ,message: "Quiz created successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const quizDetails = await Quiz.findByIdAndDelete(quizId);

        if (!quizDetails) {
            return res.status(400).json({
                errorMessage: "data not found",
            });
        }

       res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getQuizDetailsById = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const quizDetails = await Quiz.findById(quizId);

        if (!quizDetails) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        res.json({ data: quizDetails });
    } catch (error) {
        next(error);
    }
};
const updateImpression = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isQuizExists = await Quiz.findOne({ _id: quizId});
        if (!isQuizExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

      await Quiz.updateOne(
      { _id: quizId },
      { $inc: { impression: 1 } }
    );
        res.json({ message: "impression  updated successfully" });
    } catch (error) {
        next(error);
    }
};

const updateCorrectAttempt = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const { questionId } = req.body;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isQuizExists = await Quiz.findOne({ _id: quizId});

        if (!isQuizExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await Quiz.updateOne(
        { _id: quizId },
        {
            $inc: { "questions.$[question].correctAttempt": 1 }
        },
        {
            arrayFilters: [{ "question._id": questionId }],
            upsert: true
        }
        );
        res.json({ message: "updated successfully" });
    } catch (error) {
        next(error);
    }
};

const updateIncorrectAttempt = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const { questionId } = req.body;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isQuizExists = await Quiz.findOne({ _id: quizId});

        if (!isQuizExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
        await Quiz.updateOne(
        { _id: quizId },
        {
            $inc: { "questions.$[question].incorrectAttempt": 1 }
        },
        {
            arrayFilters: [{ "question._id": questionId }],
            upsert: true
        }
        );
   
        res.json({ message: "Quiz updated successfully" });
    } catch (error) {
        next(error);
    }
};

const updateOptionChoosen = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const { optionId } = req.body;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isQuizExists = await Quiz.findOne({ _id: quizId});

        if (!isQuizExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
    await Quiz.updateOne(
   { _id: quizId, "questions.options.id": optionId },
  {
    $inc: { "questions.$[question].options.$[opt].optionChoosen": 1 }
  },
  {
    arrayFilters: [
      { "question.options.id": optionId },
      { "opt.id": optionId }
    ],
    upsert: true
  }
);
        res.json({ message: "Quiz updated successfully" });
    } catch (error) {
        next(error);
    }
};

const updateQuizDetailsById = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isQuizExists = await Quiz.findOne({ _id: quizId});

        if (!isQuizExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            quizName,
            quizType,
            questionsNumber,
            questions
        } = req.body;

        if (
            !quizName ||
            !quizType ||
            !questionsNumber ||
            !questions 
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Quiz.updateOne(
            { _id: quizId },
            {
                $set: {
                    questionsNumber,
                    questions
                },
            }
        );

        res.json({ message: "Quiz updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllQuizs = async (req, res, next) => {
    const userId  = req.userId;
    try {

        const quizList = await Quiz.find(
            { refUserId: userId }
        );
        res.json({ data: quizList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuiz,
    deleteQuiz,
    getQuizDetailsById,
    updateImpression,
    updateCorrectAttempt,
    updateIncorrectAttempt,
    updateOptionChoosen,
    updateQuizDetailsById,
    getAllQuizs,
};