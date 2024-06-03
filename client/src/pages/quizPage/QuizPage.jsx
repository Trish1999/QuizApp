import React ,{ useState, useEffect }from 'react'
import { useNavigate,useParams } from "react-router-dom";

import styles from "../quizPage/QuizPage.module.css"
import { getQuizDetailsById,updateImpression,updateCorrectAttempt,updateIncorrectAttempt,updateOptionChoosen } from '../../api/QuizApi';

function QuizPage() {
  const navigate = useNavigate();
  const { quizId, quizType } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  const fetchQuizDetails = async () => {
    const result = await getQuizDetailsById(quizId);
    setQuiz(result?.data.questions ||[]);
  };
  
    const updateImpressionCount = async () => {
    try {
     await updateImpression(quizId);
    } catch (error) {
      console.error("Failed to update impressions", error);
    }
  };

 useEffect(() => {
       fetchQuizDetails();
       updateImpressionCount();
  }, [quizId]);

  useEffect(() => {
    let intervalId;
    if (timerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && timerRunning) {
      handleNext();
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, timer]);

 useEffect(() => {
    if (quiz.length > 0) {
      setTimer(quiz[questionIndex]?.timer || 0);
      setTimerRunning(true);
    }
  }, [questionIndex, quiz]);                         



    const handleNext = () => {
    setTimerRunning(false);
    if (questionIndex < quiz.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      if (quizType === "qna") {
        navigate("/score", {
          state: {
            score: correctAttempts,
            totalQuiz: quiz.length,
          }
        });
      } else {
        navigate("/thanks")
      }
    }
  };

 

  const handleButtonClick = async (optionId, quizId,questionId) => {
    const correctAnswer = parseInt(quiz[questionIndex].answer, 10);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionId
    }));
    if (quizType === 'poll') {
      await updateOptionChoosen(quizId, optionId);
    } else {
      if (optionId === correctAnswer) {
        setCorrectAttempts((prev) => prev + 1);
        await updateCorrectAttempt(quizId,questionId);
      } else {
        setIncorrectAttempts((prev) => prev + 1);
        await updateIncorrectAttempt(quizId,questionId);
      }
    }
  };

  return (

     <>
      {quiz.length > 0 && (
        <div className={styles.container}>
          <div className={styles.top}>
            <h2>0{questionIndex + 1}/0{quiz.length}</h2>
            <h2 style={{ color: "red" }}>{timer==="off" ? "" : `00:${timer}s`}</h2>
          </div>
          <div className={styles.question}>
            <h2>{quiz[questionIndex].question}</h2>
          </div>
                      <div className={styles.answers} >
          {quiz[questionIndex].options.map((opt, index) => (
            <div className={styles.options} key={opt._id.$oid || index}>
              {quiz[questionIndex].optionType === 'textnimage' && (
                <button
                  type="button"
                  className={styles.optionbox3}
                  onClick={() => handleButtonClick(opt.id,quizId,quiz[questionIndex]._id)}
                >
                  <span className={styles.buttontext}>{opt.textvalue}</span>
                  <img
                    src={opt.imgvalue}
                    alt="Option"
                    className={styles.innerimg}
                  />
                </button>
              )}
              {quiz[questionIndex].optionType === 'imageurl' && (
                <button
                  type="button"
                  className={styles.optionbox2}
                  onClick={() => handleButtonClick(opt.id,quizId,quiz[questionIndex]._id)}
                  style={{
                    backgroundImage: `url("${opt.imgvalue}")`,
                    backgroundSize: "cover",
                  }}
                >
                </button>
              )}
              {quiz[questionIndex].optionType === 'text' && (
                <button
                  type="button"
                  className={styles.optionbox1}
                  onClick={() => handleButtonClick(opt.id,quizId,quiz[questionIndex]._id)}
                >
                  {opt.textvalue}
                </button>
              )}
            </div>
          ))}
            </div>
          <div className={styles.next}>
            <button className={styles.btn} onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}




export default QuizPage
