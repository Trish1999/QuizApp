import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NavLink ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../analytics/Analytics.module.css"
import Navbar from '../../components/navbar/Navbar'
import DeleteModal from '../../modals/deleteModal/DeleteModal'
import { getAllQuizs ,getQuizDetailsById} from '../../api/QuizApi';
import FormatDate from '../../components/FormatDate';
import CreateQuizModal2 from '../../modals/createQuizModal/CreateQuizModal2';

function Analytics(props) {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizToEdit, setQuizToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [quizDetails, setQuizDetails] = useState({})
    const [quizType, setQuizType] = useState({})
  const [quizName, setQuizName] = useState({})
  
     const fetchAllQuiz = async () => {
       const result = await getAllQuizs();
        setQuiz(result?.data || 0)
  };

  const datatoEdit = async (quizId) => {
    const result = await getQuizDetailsById(quizId);
    setQuizDetails(result?.data)
  }
  
   useEffect(() => {
        fetchAllQuiz();
   }, []);
  
     const generateLink = (quizType,quizId) => {
      const link = `${window.location.origin}/quiz/${quizId}/${quizType}`;
      navigator.clipboard.writeText(link)
        .then(() => {
          toast.info("Link copied to clipboard");
            console.log("successs");
        })
      .catch((error) => {
        toast.error('Error copying link: ', error);
      });
  } 
  
 const handleEditModal = (quizId,quizType,quizName) => {
   setQuizToEdit(quizId);
   setQuizType(quizType);
      setQuizName(quizName);
   datatoEdit(quizId);
  setShowEditModal(true);
  };
  
  const handleDeleteModal = (quizId) => {
    setQuizToDelete(quizId);
    setShowDeleteModal(true);
  };

  return (
    <div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <h1 style={{color:"#548fe7"}}>Quiz Analysis</h1>
          <div className={styles.table}>
          
    <table className={styles.customtable}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Quiz Name</th>
                  <th>Created On</th>
                  <th>impression</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
        </tr>
      </thead>
      <tbody>
        {quiz.map((row, index) => (
          <tr className={index % 2 === 0 ? `${styles.evenrow}` : `${styles.oddrow}`}>
            <td>{index+1}</td>
            <td>{row.quizName}</td>
            <td>{FormatDate(row.createdAt)}</td>
            <td>{row.impression}</td>
            <td>
              <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#6f44ee" }} className={styles.icon} 
              onClick={() => handleEditModal(row._id,row.quizType,row.quizName)} />
            </td>
            <td>
              <FontAwesomeIcon icon={faTrash} size="1xs" style={{color: "#f20232"}} className={styles.icon} 
              onClick={() => handleDeleteModal(row._id)} />
            </td>
                        <td>
              <FontAwesomeIcon icon={faShareNodes} size="lg" style={{ color: "#28be1e" }} className={styles.icon} 
                onClick={()=>generateLink(row.quizType,row._id)} />
            </td>
            <td>
                       {row.quizType === 'qna' ? (
                        <NavLink
                          to={`/analysis/qna/${row.quizName}`}
                          state={{ quiz: row }} // Pass individual row data
                          style={{ textDecoration: 'underline' }}
                        >
                          Question Wise Analysis
                        </NavLink>
                      ) :  
                        ( <NavLink
                          to={`/analysis/poll/${row.quizName}`}
                          state={{ quiz: row }} // Pass individual row data
                          style={{ textDecoration: 'underline' }}
                        >
                          Question Wise Analysis
                        </NavLink>
                      ) }
        </td>
          </tr>
        ))}
      </tbody>
            </table>
            </div>
        </div>
      </div>
        {showDeleteModal &&
        <DeleteModal
          close={() => setShowDeleteModal(false)}
        open={() => setShowDeleteModal(true)}
        quizId={quizToDelete}
        refresh={fetchAllQuiz}
        />
      }
              {showEditModal &&
        <CreateQuizModal2
        editclose={() => setShowEditModal(false)}
        editopen={() => setShowEditModal(true)}
        qid={quizToEdit}
        refresh={fetchAllQuiz}
        editable={true}
        quizDetails={quizDetails}
        quizType={quizType}
        quizName={quizName}
        />
      }
    </div>
  )
}

export default Analytics;