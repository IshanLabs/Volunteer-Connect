import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth` : "http://localhost:5000/api/auth",
});

export const signupUser = async (userData) => {
  const response = await API.post("/signup", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  return response.data;
};

export const sendOTP = async (data) => {
  const response = await API.post("/send-otp", data);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await API.post("/verify-otp", data);
  return response.data;
};