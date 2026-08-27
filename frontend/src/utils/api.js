const LIVE_BACKEND_URL = "https://myportfolio-owi0.onrender.com/api";
const LOCAL_BACKEND_URL = "http://localhost:3002/api";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || LIVE_BACKEND_URL;

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`Primary backend (${BASE_URL}) unreachable, trying local fallback...`, error);
    try {
      const resLocal = await fetch(`${LOCAL_BACKEND_URL}${endpoint}`, {
        ...options,
        headers,
      });
      return await resLocal.json();
    } catch (localErr) {
      console.error(`API Error on ${endpoint}:`, localErr);
      return { success: false, message: localErr.message };
    }
  }
};
