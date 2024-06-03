import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `https://deploy-mern-api-quiz-app.vercel.app`;

export const registerUser = async ({ name,email, password }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            name,
            email,
            password,
        });
        return (response);
    } catch (error) {
        toast.error(error);
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            email,
            password,
        });
        if (response.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("email", JSON.stringify(response.data?.email));
            localStorage.setItem(
                "userId",
                (response.data?.userId)
            );
        }
        return true;
        
    } catch (error) {
         toast.error(error);
    }
};