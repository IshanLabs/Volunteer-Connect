import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/profiles`
  : "http://localhost:5000/api/profiles";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchMyProfile = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateVolunteerProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/volunteer`, profileData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateNGOProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/ngo`, profileData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
