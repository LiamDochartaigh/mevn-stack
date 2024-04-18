import { baseAXios } from './axiosService';
import router from "../router";

baseAXios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {

  if (error.response && error.response.status === 401) {
    const refreshed = await refreshUser();
    if (refreshed) {
      return baseAXios.request(error.config);
    }
  }
  router.push({ name: "home" });
  return Promise.reject(error);
});

async function registerUser(authCode: string) {
  try {
    const response = await baseAXios.post(`/register`, { code: authCode });
    if (response && response.status == 201) {
      return response;
    }
  }
  catch (e: any) {
    console.log(e.message);
  }
}

async function logOutUser() {
  try {
    const response = await baseAXios.get(`/logout`);
    if (response && response.status == 200) { return true; }
    else return false;
  }
  catch (e: any) {
    console.log(e.message);
  }
}

async function refreshUser() {
  try {
    const response = await baseAXios.get(`/refresh`);
    if (response && response.status == 200) { return true; }
    else return false;
  }
  catch (e: any) {
    console.log(e.message);
  }
}

async function activateUser(token: string){
  try{
    const response = await baseAXios.get(`/activate/${token}`);
    if(response && response.status == 200){
      return response;
    }
  }
  catch(e: any){
    console.log(e.message);
  }
}

export default { registerUser, logOutUser, activateUser }