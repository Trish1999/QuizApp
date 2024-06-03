import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../navbar/Navbar.module.css';
import CreateQuizModal1 from '../../modals/createQuizModal/CreateQuizModal1';

const Navbar = (props) => {
  const { refresh } = props;

  const navigate = useNavigate();
  const [showCreateQuizModal1,setShowCreateQuizModal1]=useState(false)

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h2>QUIZZIE</h2>
      </div>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics" >Analytics</Link>
        </li>
        <li>
          <button onClick={() => setShowCreateQuizModal1(true)} className={styles.btn}>
            Create Quiz
          </button>
        </li>
        <hr style={{
          marginTop: "12rem"
        }} />
        <li>
          <button onClick={handleLogout} className={styles.btn}>
            Logout
          </button>
        </li>

      </ul>
      {showCreateQuizModal1 &&
        <CreateQuizModal1
        open={() => setShowCreateQuizModal1(true)}
        close={() => setShowCreateQuizModal1(false)}
        refresh={refresh}
        />
      }
    </div>
  );
};

export default Navbar;
