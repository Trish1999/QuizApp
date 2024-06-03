import React from 'react'
import { useLocation } from 'react-router-dom';

import styles from "../analysisPage/Analysis.module.css";
import Navbar from '../../components/navbar/Navbar';
import FormatDate from '../../components/FormatDate';

function PollAnalysis() {
    const location = useLocation();
  const { quiz={} } = location.state || {};

  return (
    <div>
        <div className={styles.main}>
        <Navbar />
              <div className={styles.content}>
                  <div className={styles.header}>
                      <h2 style={{fontSize:"2.5rem",color:"#548fe7"}}>{quiz.quizName} Question Analysis</h2>
                  <span style={{color:"#FF681F",fontSize:"0.8rem",fontWeight:'bold',marginTop:"3rem"}}>Created on:{FormatDate(quiz.createdAt)}
                      <br />
                          impression:{quiz.impression}</span>
                  </div>
                      {quiz.questions.map((row, index) => (
                          <div class={styles.displayquestion}>
                              <h2> Q.{index + 1} {row.question}</h2>
                              <div className={styles.counts}>
                              {(row.options).map((op,index)=>(
                                  <div className={styles.count}>
                                      <h2>{op.optionChoosen || 0 }</h2><span style={{ margin: "1.5rem 1rem" }}>option {index + 1}</span>
                                  </div>
                              ))}
                                  </div>
                              <hr/>
                         </div>
                      ))}
        </div>
      </div>
      </div>
  )
}
export default PollAnalysis
