import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/events`
  : "http://localhost:5000/api/events";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllEvents = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const fetchMyNGOEvents = async () => {
  const response = await axios.get(`${API_URL}/ngo/my-events`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
