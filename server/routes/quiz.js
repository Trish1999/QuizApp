const express = require("express");
const router = express.Router();

const quizController = require("../controller/quizController")
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, quizController.createQuiz);
router.delete("/delete/:quizId", verifyToken, quizController.deleteQuiz);
router.get("/quiz-details/:quizId", quizController.getQuizDetailsById);
router.put("/update/:quizId",  quizController.updateQuizDetailsById);
router.get("/all",verifyToken, quizController.getAllQuizs);
router.put("/update/correct/:quizId", quizController.updateCorrectAttempt); 
router.put("/update/incorrect/:quizId", quizController.updateIncorrectAttempt);
router.put("/update/impression/:quizId", quizController.updateImpression);
router.put("/update/optionchoosen/:quizId", quizController.updateOptionChoosen);

module.exports = router;