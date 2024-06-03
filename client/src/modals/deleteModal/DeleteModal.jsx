import React from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../deleteModal/DeleteModal.module.css";
import "../../modals/Custom-styling.css";
import { deleteQuiz } from '../../api/QuizApi';

function DeleteModal(props) {
    const { close, open ,quizId, refresh} = props;
  
  const handleDelete = async(quizId) => {
    const result = await deleteQuiz(quizId);
    close();
    toast.info("Quiz deleted successfully");
     refresh();
    
    }
    

  return (
      <div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <Modal open={open} onClose={close} center
              classNames={{
                  modal: 'customModal3',
              }}>

              <div className={styles.container}>
                  <h2>Are you confirm you want to delete?</h2>
                  <div className={styles.footer}>
                <button className={styles.footerbtn1} onClick={()=>handleDelete(quizId)}>Confirm Delete</button>
               <button className={styles.footerbtn2} onClick={close}>Cancel</button>
              </div>
          </div>
      </Modal>
    </div>
  )
}

export default DeleteModal