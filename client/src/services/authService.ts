import { baseAXios } from "./axiosService";

export async function authGoogle(code: string) {
    try {
        const response = await baseAXios.post(`/auth/google`, {
            code: code
        });
        if (response && response.status == 200) {
            return response;
        }
    }
    catch (e: any) {
        console.error(e.message);
    }
}

export default{
    authGoogle
}