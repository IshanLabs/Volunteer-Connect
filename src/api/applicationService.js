import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/applications`
  : "http://localhost:5000/api/applications";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const applyForEvent = async (data) => {
  const response = await axios.post(API_URL, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const fetchMyApplications = async () => {
  const response = await axios.get(`${API_URL}/my-applications`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const fetchEventApplications = async (eventId) => {
  const response = await axios.get(`${API_URL}/event/${eventId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    { status },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
