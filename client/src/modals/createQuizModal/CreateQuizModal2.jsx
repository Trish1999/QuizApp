import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createQuiz,updateQuizDetailsById } from '../../api/QuizApi';
import styles from "../createQuizModal/CreateQuizModal.module.css";
import "../../modals/Custom-styling.css";
import LinkModal from '../linkModal/LinkModal';

function CreateQuizModal2(props) {
  const { close, open, editopen, editclose, quizName, quizType, refresh, editable, quizDetails,qid,close1 } = props;
  let stateData;
  if (editable) {
    stateData = quizDetails.questions;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [link, setLink] = useState('');
    const [quizId, setQuizId] = useState("");
  const [slides, setSlides] = useState([])

  
   useEffect(() => {
    if (stateData) {
      setSlides(stateData);
      setQuizId(qid)
    } else {
      setSlides([{
        question: '',
        optionType: 'text',
        options: [
          { id: 1, textvalue: "", imgvalue: "" },
          { id: 2, textvalue: "", imgvalue: "" }
        ],
        answer: '',
        timer: 'off'
      }]);
       setQuizId('');
    }
  }, [stateData]);


  const addField = (event) => {
    event.preventDefault();
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const currentOptions = newSlides[currentSlide].options;
      const newField = { id: currentOptions.length ? currentOptions[currentOptions.length - 1].id + 1 : 1, textvalue: "", imgvalue: "" };
        newSlides[currentSlide].options = [...currentOptions, newField];
      return newSlides;
    });
  };

  const removeField = (id) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[currentSlide].options = newSlides[currentSlide].options.filter(field => field.id !== id);
      return newSlides;
    });
  };


  const handleInputChange = (id, fieldType, value) => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      const options = updatedSlides[currentSlide].options.map(option =>
        option.id === id ? { ...option, [fieldType]: value } : option
      );
      updatedSlides[currentSlide].options = options;
      return updatedSlides;
    });
     setErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[currentSlide] = { ...newErrors[currentSlide], options: '' };
      return newErrors;
    });
  };

  const handleSelection = (id) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[currentSlide].answer = id;
      return newSlides;
    });
      setErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[currentSlide] = { ...newErrors[currentSlide], answer: '' };
      return newErrors;
    });
  };
  const handleChange = (index, field, value) => {
   setSlides(prevSlides => {
    const newSlides = [...prevSlides];
    newSlides[index][field] = value;
    
    // Reset the options values when optionType changes
     if (field === 'optionType') {
       newSlides[index].options = newSlides[index].options.map(option => {
         return { id: option.id, textvalue: '', imgvalue: '' };
       });
     }
         return newSlides;
  });
    setErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [field]: '' };
      return newErrors;
    });
  };

  const addSlide = () => {
    setSlides(prevSlides => [
      ...prevSlides,
      {
        question: '',
        optionType: 'text',
        options: [
          { id: 1, textvalue: "", imgvalue: "" },
          { id: 2, textvalue: "", imgvalue: "" }
        ],
        answer: '',
        timer: 'off'
      }
    ]);
    setCurrentSlide(slides.length);
  };

  const removeSlide = (index) => {
    setSlides(prevSlides => prevSlides.filter((_, slideIndex) => slideIndex !== index));
    if (currentSlide >= index && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const generateLink = (quizId,quizType) => {
    const generatedLink = `${window.location.origin}/quiz/${quizId}/${quizType}`;
    setLink(generatedLink);
  };

const validate = () => {
  let newErrors = slides.map(slide => {
    const optionErrors = slide.options.map(option => {
      if (slide.optionType === 'text' && !option.textvalue ) {
        return 'Fill the text';
      }
      if (slide.optionType === 'imageurl' && !option.imgvalue) {
        return 'Fill the imageUrl';
      }
      if (slide.optionType === 'textnimage' && (!option.textvalue || !option.imgvalue)) {
        return 'fill the field';
      }
      return '';
    });
    if (quizType === "qna") {
      return {
        question: !slide.question ? 'Question is required' : '',
        options: optionErrors,
        answer: !slide.answer ? 'An answer must be selected' : '',
      };
    } else {
            return {
        question: !slide.question ? 'Question is required' : '',
        options: optionErrors,
      };
    }
  });

  setErrors(newErrors);
  
  return !newErrors.some(error => error.question || error.answer || error.options.some(optionError => optionError));
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      quizName: quizName,
      quizType: quizType,
      questionsNumber: (slides.length),
      questions:slides
    }
    if (validate()) {
      try {
        if (editable) {
          await updateQuizDetailsById(quizId, payload);
          editclose();
          refresh();
        } else {
          const result = await createQuiz(payload);
          setQuizId(result.data.quizId)
          setShowLinkModal(true);
          generateLink(result.data.quizId, quizType);
          console.log('Success');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Modal open={editable? editopen:open} onClose={editable? editclose:close} center classNames={{ modal: 'customModal2' }}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.info}>Max 5 questions</div>
            <div className={styles.header}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={styles.mainbutton}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    fontWeight: currentSlide === index ? 'bold' : 'normal',
                    backgroundColor: currentSlide === index ? '#4CBB17' : 'white',
                  }}
                >
                  {`${index + 1}`}
                  {index > 0 && (
                    <span
                      className={styles.closeicon}
                      onClick={(e) => { e.stopPropagation(); removeSlide(index); }}
                    >
                      &times;
                    </span>
                  )}
                </button>
              ))}
              {slides.length < 5 && (
                <button type="button" className={styles.mainbutton} onClick={addSlide}>
                  &#10750;
                </button>
              )}
            </div>
            {slides.map((slide, index) => (
              <div key={index} style={{ display: currentSlide === index ? 'block' : 'none' }}>
                <div className={styles.input}>
                  <input
                    type="text"
                    className={styles.inputbox1}
                    value={slide.question}
                    onChange={(e) => handleChange(index, 'question', e.target.value)}
                    placeholder="Question"
                    style={{ borderColor: errors[index]?.question ? 'red' : 'black' }}
                  />
                </div>
                {errors[index]?.question && <div style={{ color: 'red', textAlign: 'center' }}>{errors[index].question}</div>}
                <div className={styles.optiontype}>
                  <label>Option Type</label>
                  <input
                    type="radio"
                    name={`optionType-${index}`}
                    value="text"
                    id={`text-${index}`}
                    checked={slide.optionType === "text"}
                    onChange={() => handleChange(index, 'optionType', 'text')}
                  />
                  <label htmlFor={`text-${index}`}>Text</label>
                  <input
                    type="radio"
                    name={`optionType-${index}`}
                    value="imageurl"
                    id={`imageurl-${index}`}
                    checked={slide.optionType === "imageurl"}
                    onChange={() => handleChange(index, 'optionType', 'imageurl')}
                  />
                  <label htmlFor={`imageurl-${index}`}>Image URL</label>
                  <input
                    type="radio"
                    name={`optionType-${index}`}
                    value="textnimage"
                    id={`textnimage-${index}`}
                    checked={slide.optionType === "textnimage"}
                    onChange={() => handleChange(index, 'optionType', 'textnimage')}
                  />
                  <label htmlFor={`textnimage-${index}`}>Text & Image URL</label>
                </div>
                <div className={styles.maincontainer}>
                  <div className={styles.container}>
                    {slide.options.map((field,index) => (
                      <div key={field.id} className={styles.fieldcontainer}>
                        {quizType === "qna" &&
                          <input
                            type="radio"
                            name={`answer-${index}`}
                            checked={slide.answer === field.id}
                            onChange={() => handleSelection(field.id)}
                          />}
                        {(slide.optionType === "textnimage" || slide.optionType === "text") && (
                          <input
                            type="text"
                            value={field.textvalue}
                            onChange={(e) => handleInputChange(field.id, 'textvalue', e.target.value)}
                            className={slide.answer === field.id ? `${styles.selected}` : `${styles.options}`}
                            placeholder="Text"
                          />
                        )}
                        {(slide.optionType === "textnimage" || slide.optionType === "imageurl") && (
                          <input
                            type="text"
                            value={field.imgvalue}
                            onChange={(e) => handleInputChange(field.id, 'imgvalue', e.target.value)}
                            className={slide.answer === field.id ? `${styles.selected}` : `${styles.options}`}
                            placeholder= "Image Url"
                          />
                        )}
                        {field.id > 2 && (
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="2xs"
                            style={{ color: "#f20232" }}
                            onClick={() => removeField(field.id)}
                            className={styles.deletebtn}
                          />
                        )}
                      </div>
                    ))}
                    {errors[index]?.options &&
                      <div style={{ color: 'red', textAlign: 'center' }}>
                        {(errors[index].options).length > 1 ?[...new Set(errors[index].options)]: errors[index].options}</div>}
                    {quizType === "qna" &&  errors[index]?.answer && <div style={{ color: 'red', textAlign: 'center' }}>{errors[index].answer}</div> }

                    {slide.options.length < 4 && (
                      <button type="button" className={styles.addbtn} onClick={addField}>Add Field</button>
                    )}
                  </div>
                  {quizType === "qna" && (
                    <div className={styles.timer}>
                      <label style={{ marginLeft: '20px' }}>Timer</label>
                      <button
                        type="button"
                        onClick={() => handleChange(currentSlide, 'timer', 'off')}
                        className={styles.timerbtn}
                        style={{ backgroundColor: slide.timer === "off" ? '#e5240b' : 'white' }}
                      >
                        Off
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange(currentSlide, 'timer', '5')}
                        className={styles.timerbtn}
                        style={{ backgroundColor: slide.timer === "5" ? '#e5240b' : 'white' }}
                      >
                        5Sec
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange(currentSlide, 'timer', '10')}
                        className={styles.timerbtn}
                        style={{ backgroundColor: slide.timer === "10" ? '#e5240b' : 'white' }}
                      >
                        10Sec
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.footer}>
              <button type="button" className={styles.footerbtn1} onClick={close}>Cancel</button>
              <button type="submit" className={styles.footerbtn2}>Continue</button>
            </div>
          </form>
        </div>
      </Modal>
      {showLinkModal && (
        <LinkModal
          open={() => setShowLinkModal(true)}
          close={() => setShowLinkModal(false)}
          link={link}
          refresh={refresh}
          close1={close1}
          close2={close}
        />
      )}
    </div>
  );
}

export default CreateQuizModal2;
