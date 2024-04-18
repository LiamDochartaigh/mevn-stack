import axios from "axios"

export const baseAXios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE}`,
  withCredentials: true
});