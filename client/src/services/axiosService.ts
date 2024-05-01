import axios from "axios"

const baseAXios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE}`,
  withCredentials: true
});

axios.defaults.headers.common['Cache-Control'] = 'no-cache';

baseAXios.interceptors.response.use(
  response => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response);
      }, 2000);
    });
  },
  error => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(error);
      }, 2000);
    });
  }
);

export { baseAXios };
