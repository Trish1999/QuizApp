import React, { useState, useEffect } from 'react'

import styles from "../scorePage/ScorePage.module.css"
 
function ThankyouPage() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.thanku}>
          <h1>THANK YOU</h1>
          <h1>for participating in the poll</h1>
        </div>
      </div>
    </>
  );
};


export default ThankyouPage
