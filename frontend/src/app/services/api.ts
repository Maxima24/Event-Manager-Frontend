import axios from "axios";
const api =axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your backend URL
    withCredentials:true
});

export default api