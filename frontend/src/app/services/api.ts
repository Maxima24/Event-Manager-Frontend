import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your backend URL
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
   const originalRequest = err.config;
   console.log(err.response)
if (
  !err.response?.data.success  && // optional chaining
  err.response?.data.message === "Unauthorized" &&
  !originalRequest._retry
) {
  originalRequest._retry = true;
  try {
    // Call refresh endpoint
    await api.post("/public/auth/refresh-token"); // baseURL already included

    // Retry original request
    return api(originalRequest);
  } catch (refreshError) {
    console.error("Refresh token failed", refreshError);

    // Log out user
    await api.post("/public/logout-all");
    window.location.href = "/login";
    return Promise.reject(refreshError);
  } 
}

  }
);

api.interceptors.request.use(
  (config)=>{
    const hasCookies = document.cookie && document.cookie.length>0
    if(!hasCookies){
      console.warn("Request Blocked: Request Attached")
      return Promise.reject(new Error("No authentication cookies Found"))
    }
    return config
  },
  (error)=>Promise.reject(error)
)
export default api;


