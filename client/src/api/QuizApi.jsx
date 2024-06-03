import axios from "axios";
import { Navigate } from "react-router-dom";
const backendUrl = `http://localhost:3000/api/v1/quiz`;

export const createQuiz = async (postPayload) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = axios.post(reqUrl, postPayload);
        return response;
    } catch (error) {
        if (error.isTokenExpired) {
            localStorage.clear();
            Navigate("/");
        }
        alert("Something went wrong");
    }
};

export const getQuizDetailsById = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/quiz-details/${quizId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateImpression = async ( quizId) => {
    try {
        const reqUrl = `${backendUrl}/update/impression/${quizId}`;
        const response = await axios.put(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};
export const updateCorrectAttempt = async ( quizId,questionId) => {
    try {
        const reqUrl = `${backendUrl}/update/correct/${quizId}`;
        const response = await axios.put(reqUrl,{questionId});
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const updateIncorrectAttempt = async ( quizId,questionId) => {
    try {
        const reqUrl = `${backendUrl}/update/incorrect/${quizId}`;
        const response = await axios.put(reqUrl,{questionId});
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const updateOptionChoosen = async ( quizId,optionId) => {
    try {
        const reqUrl = `${backendUrl}/update/optionchoosen/${quizId}`;
        const response = await axios.put(reqUrl,{optionId});
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};
export const updateQuizDetailsById = async ( quizId,postPayload) => {
    try {
        const reqUrl = `${backendUrl}/update/${quizId}`;
        const response = await axios.put(reqUrl,postPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};



export const deleteQuiz = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/delete/${quizId}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const getAllQuizs = async () => {
    try {
        const reqUrl = `${backendUrl}/all`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};