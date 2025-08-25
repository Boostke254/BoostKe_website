import axios from "axios";
// Use local development URL or production URL based on environment
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/";
