"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

// ✅ Create Axios instance with withCredentials
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true, // ✅ Ensure cookies are sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Store user info after login (NO token store in js-cookie!)
export const storeAuthData = (responseData) => {
  const { user, token } = responseData;

  // ✅ DO NOT SET TOKEN IN JS COOKIES

  if (user) {
    Cookies.set("user", JSON.stringify(user));
    Cookies.set("userRole", user.role || "user");
    Cookies.set("userId", user._id);
    Cookies.set("userName", user.name);
  }
};

// ✅ Request Interceptor - Attach Bearer Token (optional for APIs needing it)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // optional fallback
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - Handle expired sessions
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Clear client-side cookies
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("userRole");
      Cookies.remove("userId");
      Cookies.remove("userName");

      toast.error("Session expired. Please log in again.");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
