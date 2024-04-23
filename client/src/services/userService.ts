import { baseAXios } from './axiosService';
import { useAuthStore, useUIStore } from '../store';

baseAXios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
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
    console.error(e.message);
  }
}

async function loginUser(email: string, password: string) {
  try {
    const response = await baseAXios.post(`/login`, {
      email: email,
      password: password
    });
    if (response && response.status == 200) {
      useAuthStore().logIn();
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
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
    console.error(e.message);
  }
}

async function validateUser() {
  try {
    useUIStore().showLoading();
    const response = await baseAXios.get(`/validate`);
    useUIStore().hideLoading();
    if (response && response.status == 200) {
      useAuthStore().logIn();
      return true;
    }
    else return false;
  }
  catch (e: any) {
    console.error(e.message);
    useUIStore().hideLoading();
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
    console.error(e.message);
  }
}

async function validatePasswordResetToken(token: string) {
  try {
    const response = await baseAXios.post(`/password-reset/validate/`, {
      token: token
    });
    if (response && response.status == 200) {
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }

}

export default { registerUser, logOutUser, activateUser, validateUser, loginUser, validatePasswordResetToken }