import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/admin`
  : "http://localhost:5000/api/admin";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAdminStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const fetchPendingNGOs = async () => {
  const response = await axios.get(`${API_URL}/ngos/pending`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const verifyNGO = async (ngoProfileId, status) => {
  const response = await axios.patch(
    `${API_URL}/ngos/${ngoProfileId}/verify`,
    { status },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
