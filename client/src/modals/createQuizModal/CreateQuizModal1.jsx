
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from "../createQuizModal/CreateQuizModal.module.css"
import "../../modals/Custom-styling.css"
import CreateQuizModal2 from "./CreateQuizModal2"

function CreateQuizModal1(props) {
 const { close, open,refresh} = props;
   const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');
    const [quiznameError, setQuiznameError] = useState('');
  const [quiztypeError, setQuiztypeError] = useState('');
   const [showCreateQuizModal2,SetShowCreateQuizModal2]=useState(false)
  
  const handleSubmit = (event) => {
      event.preventDefault();

    if (quizName === '') {
      setQuiznameError('Quiz Name is required');
    } else {
      setQuiznameError('');
    }

    if (quizType === '') {
      setQuiztypeError('Type is required');
    } else {
      setQuiztypeError('');
    }
    if (quizType !== '' && quizName!== '') {
      SetShowCreateQuizModal2(true);
    }
    
  };




  return (
    <div>
      <Modal open={open} onClose={close} center
              classNames={{
                  modal: 'customModal1',
              }}>
        <div className={styles.container}>
              <form onSubmit={handleSubmit}>
      <div className={styles.input}>
              <input
                className={styles.inputbox1}
          type="text"
                id="name"
                placeholder='Quiz name'
          value={quizName}
                onChange={(e) => {
                  setQuiznameError('')
                  setQuizName(e.target.value)
                }}
          style={{ borderColor: quiznameError ? 'red' : 'black' }}
              />
              </div>
        {quiznameError && <div style={{ color: 'red',textAlign:'center'  }}>{quiznameError}</div>}
      <div className={styles.type}>
        <label style={{marginTop:'10px'}}>Quiz Type:</label>
        <button
                type="button"
                  
                onClick={() => {
                  setQuizType('qna')
                  setQuiztypeError('')
                }
                }
                style={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  backgroundColor: quizType === 'qna' ? '#4CBB17' : 'white'
                }}
        >
          Q & A
        </button>
        <button
                type="button"
                onClick={() => {
                  setQuizType('poll')
                  setQuiztypeError('')
                }}
                style={{  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  backgroundColor: quizType === 'poll' ? '#4CBB17' : 'white'
                }}
        >
          Poll Type
              </button>
      </div>
              
        {quiztypeError && <div style={{ color: 'red',textAlign:'center' }}>{quiztypeError}</div>}
            <div className={styles.footer}>
               <button className={styles.footerbtn1} onClick={close}>Cancel</button>
              <button type="submit" className={styles.footerbtn2} onClick={handleSubmit}>Continue</button>
              </div>
    </form>
  
          </div>
      </Modal>
      {showCreateQuizModal2 &&
        <CreateQuizModal2
          open={() => SetShowCreateQuizModal2(true)}
          close={() => SetShowCreateQuizModal2(false)}
          quizName={quizName}
          quizType={quizType}
          refresh={refresh}
          close1={close}
      />
      }
    </div>
);
}

export default CreateQuizModal1
