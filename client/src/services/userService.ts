import { hexeumAxios } from './axiosService';
import router from "../router";

hexeumAxios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {

  if (error.response && error.response.status === 401) {
    const refreshed = await refreshUser();
    if (refreshed) {
      return hexeumAxios.request(error.config);
    }
  }
  router.push({ name: "home" });
  return Promise.reject(error);
});

async function registerUser(authCode: string) {
  try {
    const response = await hexeumAxios.post(`/register`, { code: authCode });
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
    const response = await hexeumAxios.get(`/logout`);
    if (response && response.status == 200) { return true; }
    else return false;
  }
  catch (e: any) {
    console.log(e.message);
  }
}

async function refreshUser() {
  try {
    const response = await hexeumAxios.get(`/refresh`);
    if (response && response.status == 200) { return true; }
    else return false;
  }
  catch (e: any) {
    console.log(e.message);
  }

}

export default { registerUser, logOutUser }