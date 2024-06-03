import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { loginUser,registerUser } from "../../api/UserApi";
import styles from "../register/RegisterPage.module.css"

toast.configure;

function RegisterPage() {
const [isSignup, setIsSignup] = useState(true);

  const showSignupForm = () => {
    setIsSignup(true);
  };

  const showLoginForm = () => {
    setIsSignup(false);
  };


  return (
    <div>
      <div className={styles.container}>
        <h1 style={{ textAlign: 'center', padding: '1rem' }}>QUIZZIE</h1>
        <div className={styles.btn}>
          <button className={styles.btn1} onClick={showSignupForm}>Sign Up</button>
          <button className={styles.btn2} onClick={showLoginForm} >Log In</button>
        </div>
        <div className={styles.form}>
          {isSignup ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

const SignupForm = () => {
  const [formData, setFormData] = useState({ name:"",email: "", password: "" ,confpassword:""});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confpassword) newErrors.confpassword = 'Confirm password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else if(formData.password !== formData.confpassword) {
      toast.error("Password and confirm password is not matching please recheck");
      }
    else {
      const result = await registerUser(formData);
      if (result) {
        toast.success("Successfully registered please login to your account ");
        navigate("/");
         }
      }
  };


  return (
    <div>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <form onSubmit={handleSubmit}>
        <div >
          <label>Name </label>
          <input className={errors.name ? `${styles.error}` : `${styles.inputbox}`}
            type="text"
            name="name"
            onChange={handleFormChange}
            placeholder={errors.name ? `${errors.name}` : "Enter the name"} />
        </div>
        <div>
          <label>Email </label>
          <input className={errors.email ? `${styles.error}` : `${styles.inputbox}`}
            type="email"
            name="email"
            onChange={handleFormChange}
            placeholder={errors.email ? `${errors.email}` : "Enter the email"}
          />
        </div>
        <div>
          <label>Password </label>
          <input className={errors.password ? `${styles.error}` : `${styles.inputbox}`}
            type="password"
            name="password"
            onChange={handleFormChange}
            placeholder={errors.password ? `${errors.password}` : "Enter the password"} />
        </div>
        <div>
          <label>Confirm Password </label>
          <input className={errors.confpassword ? `${styles.error}` : `${styles.inputbox}`}
            type="password"
            name="confpassword"
            onChange={handleFormChange}
            placeholder={errors.confpassword ? `${errors.confpassword}` : "Enter the confirm password"} />
        </div>
        <button className={styles.submit} type="submit">Sign-up</button>
      </form>
    </div>
   );
};


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value });
  };

    const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
       const result = await loginUser(formData);
      if (result) {
        toast.success("Successfully loggedin ");
        navigate("/dashboard");
      }
      }
    };

  return (
    <div >
        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email </label>
          <input className={errors.email ? `${styles.error}` : `${styles.inputbox}`}
            type="email"
            name="email"
            onChange={handleFormChange}
            placeholder={errors.email ? `${errors.email}` : "Enter the email"}
          />
        </div>
        <div>
          <label>Password </label>
          <input className={errors.password ? `${styles.error}` : `${styles.inputbox}`}
            type="password"
            name="password" 
            onChange={handleFormChange}
            placeholder={errors.password ? `${errors.password}` : "Enter the password"} />
        </div>
        <button className= {styles.submit} type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegisterPage
