import { baseAXios } from './axiosService';
import { useAuthStore } from '../store';

baseAXios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {

  if (error.response && error.response.status === 401) {
    const refreshed = await validateUser();
    if (refreshed) {
      return baseAXios.request(error.config);
    }
  }
  return Promise.reject(error);
});

async function registerUser(email: string, password: string) {
  try {
    const response = await baseAXios.post(`/register`, {
      email: email,
      password: password
    });
    if (response && response.status == 201) {
      useAuthStore().logIn();
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
    if (response && response.status == 200) {
      useAuthStore().logOut();
      return true;
    }
    else return false;
  }
  catch (e: any) {
    console.log(e.message);
  }
}

async function validateUser() {
  try{
    const response = await baseAXios.get(`/validate`);
    if(response && response.status == 200){
      useAuthStore().logIn();
      return true;
    }
    else return false;
  }
  catch(e: any){
    console.log(e.message);
  }
}

async function activateUser(token: string) {
  try {
    const response = await baseAXios.get(`/activate/${token}`);
    if (response && response.status == 200) {
      return response;
    }
  }
  catch (e: any) {
    console.log(e.message);
  }
}

export default { registerUser, logOutUser, activateUser, validateUser }