import { baseAXios } from './axiosService';
import { useUserStore, useUIStore } from '../store';
import { IsDefined } from 'class-validator';
import { validateAndTransform } from '../util/dataValidation';
import { authGoogle } from './authService';

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
    const response = await baseAXios.post(`/user/register`, {
      email: email,
      password: password
    });
    if (response && response.status == 201) {
      const user = await validateAndTransform(User, response.data as User);
      useUserStore().logIn(user);
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

async function loginUser(email: string, password: string) {
  try {

    const response = await baseAXios.post(`/user/login`, {
      email: email,
      password: password
    });

    if (response && response.status == 200) {
      const user = await validateAndTransform(User, response.data as User);
      useUserStore().logIn(user);
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

export async function loginGoogleUser(code: string) {
  try {
    const response = await authGoogle(code);
    if (response && response.status == 200) {
      const user = await validateAndTransform(User, response.data as User);
      useUserStore().logIn(user);
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

async function logOutUser() {
  try {
    useUIStore().showLoading();
    const response = await baseAXios.get(`/user/logout`);
    useUIStore().hideLoading();
    if (response && response.status == 200) {
      useUserStore().logOut();
      return true;
    }
    else return false;
  }
  catch (e: any) {
    console.error(e.message);
    useUIStore().hideLoading();
  }
}

async function validateUser() {
  try {
    useUIStore().showLoading();
    const response = await baseAXios.get(`/user/validate`);
    useUIStore().hideLoading();
    if (response && response.status == 200) {
      const user = await validateAndTransform(User, response.data as User);
      useUserStore().logIn(user);
      return true;
    }
    else {
      return false;
    }
  }
  catch (e: any) {
    console.error(e.message);
    useUIStore().hideLoading();
  }
}

async function activateUser(token: string) {
  try {
    const response = await baseAXios.post(`/user/activate/`, {
      token: token
    });
    if (response && response.status == 200) {
      const userStore = useUserStore();
      if (userStore.user) {
        userStore.user.email_confirmed = true;
      }
      return response;
    }
  }
  catch (e: any) {
    console.error(e.message);
  }
}

async function validatePasswordResetToken(token: string) {
  try {
    const response = await baseAXios.post(`/user/password-reset/validate/`, {
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
    const response = await baseAXios.post(`/user/password-reset/`, {
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
    const response = await baseAXios.post(`/user/password-reset/change`, {
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
    const response = await baseAXios.get(`/user/resend-confirmation/`);
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
  loginGoogleUser,
  validatePasswordResetToken,
  resetPasswordRequest,
  passwordChange,
  sendActivationEmail
}