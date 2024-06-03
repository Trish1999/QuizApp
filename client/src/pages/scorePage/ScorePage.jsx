import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import styles from "../scorePage/ScorePage.module.css"
import Trophy from "../../assets/—Pngtree—beautiful trophy_4541793.png"
 
function ScorePage() {
    const location = useLocation();
    const { score,totalQuiz } = location.state || {};

  return (
      <>
          <div className={styles.container}>
              <div className={styles.top}>
                  <h2>Congrats Quiz Is Completed</h2>
                  <img src={Trophy} alt="trophy" className={styles.trophy} />
                  <h2>Your Score Is :<span style={{ color: "green" }}>0{score}/0{totalQuiz}</span></h2>
              </div>
          </div>
      </>
  );
};



export default ScorePage
