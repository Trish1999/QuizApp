import React,{useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Navbar from '../../components/navbar/Navbar';
import styles from "../dashboard/Dashboard.module.css";
import { getAllQuizs } from '../../api/QuizApi';
import FormatDate  from '../../components/FormatDate';

const eye = <FontAwesomeIcon icon={faEye} style={{color: "#FF681F",fontSize:"1rem"}}/>;

function Dashboard() {
  const [quiz, setQuiz] = useState([]);

     const fetchAllQuiz = async () => {
       const result = await getAllQuizs();
        setQuiz(result?.data || []) ;
  };
  
   useEffect(() => {
        fetchAllQuiz();
   }, []);
  
  const shortedQuiz=quiz.sort((a, b) => b.impression - a.impression);
  const totalQuiz = quiz.length;

  const totalQuestion = quiz.map((q) => q.questionsNumber)
    .reduce((sum, num) => sum + num, 0);

  const totalImpression = quiz.map((q) =>q.impression)
    .reduce((sum, num) => sum + num, 0);
  
  function formatImpression(impression) {
    if (impression >= 1000) {
      const number = (impression / 1000).toFixed(1) + 'k';
      return number;
    }
    else {
      return impression;
    }
}


  return (
    <>
        <div className={styles.main}>
        <Navbar
          refresh={fetchAllQuiz} />
          <div className={styles.content}>
            <div class={styles.displaynumbers}>
              <div className={styles.count1}>
              <span style={{ fontSize: '3rem' }} >{totalQuiz}</span> Quiz Created
              </div>
              <div className={styles.count2}>
                <span style={{ fontSize: '3rem' }} >{totalQuestion}</span>  Questions Created
              </div>
              <div className={styles.count3}>
              <span style={{ fontSize: '3rem' }}>{formatImpression(totalImpression)}</span>  Total Impression
              </div>
            </div>
            <div> <h2 style={{ marginTop: "5rem", marginLeft: "2rem" }}>Trending Quizs</h2></div>
    
          <div className={styles.trendingquiz}>
          {shortedQuiz.map((q)=>
            <div className={styles.quiz}>
                <div className={styles.quizheader}>
                               <span style={{ fontSize: '1.5rem' }}>{q.quizName}</span>
                               <span style={{ fontSize: '1rem', color: "#FF681F" }}>{q.impression}{eye}</span>
              </div>
                  <p style={{ color: "green" }}>created on:{FormatDate(q.createdAt)}</p>
              </div>
                          
            )}
             </div>
          </div>
      </div>
      </>
  )
}

export default Dashboard
