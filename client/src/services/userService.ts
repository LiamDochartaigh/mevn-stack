import { baseAXios } from './axiosService';
import { useAuthStore, useUIStore } from '../store';
import { IsDefined } from 'class-validator';
import { validateAndTransform } from '../util/dataValidation';

export class User {
  @IsDefined()
  email: string;
  @IsDefined()
  user_avatar_URL: string;
  @IsDefined()
  email_confirmed: boolean;

  constructor(email: string, user_avatar_URL: string, email_confirmed: boolean) {
    this.email = email;
    this.user_avatar_URL = user_avatar_URL;
    this.email_confirmed = email_confirmed;
  }
}

async function registerUser(email: string, password: string) {
  try {
    const response = await baseAXios.post(`/register`, {
      email: email,
      password: password
    });
    if (response && response.status == 201) {
      const user = await validateAndTransform(User, response.data as User);
      useAuthStore().logIn(user);
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
      const user = await validateAndTransform(User, response.data as User);
      useAuthStore().logIn(user);
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
      const user = await validateAndTransform(User, response.data as User);
      useAuthStore().logIn(user);
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
    const response = await baseAXios.post(`/activate/`, {
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

async function resetPasswordRequest(email: string) {
  try {
    const response = await baseAXios.post(`/password-reset/`, {
      email: email
    });
    if (response && response.status == 200) {
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

async function passwordChange(token: string, newPassword: string) {
  try {
    const response = await baseAXios.post(`/password-reset/change`, {
      token: token,
      password: newPassword
    });
    if (response && response.status == 200) {
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

async function sendActivationEmail() {
  try {
    const response = await baseAXios.get(`/resend-confirmation/`);
    if (response && response.status == 200) {
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }

}

export default {
  registerUser,
  logOutUser,
  activateUser,
  validateUser,
  loginUser,
  validatePasswordResetToken,
  resetPasswordRequest,
  passwordChange,
  sendActivationEmail
}