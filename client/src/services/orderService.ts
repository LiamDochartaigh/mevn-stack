import { baseAXios } from "./axiosService"
import { IsDefined } from 'class-validator';
import { validateAndTransform } from '../util/dataValidation';

export class Ordder {
    @IsDefined()
    _id: string;
    @IsDefined()
    name: string;
    @IsDefined()
    description: string;
    @IsDefined()
    price: number;
    @IsDefined()
    image_URL: string;

    constructor(id: string, name: string, description: string, price: number, image_URL: string) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_URL = image_URL;
    }
}

export async function GetOrder(sessionId: string){
    try {
        const response = await baseAXios.post(`/order/retrieve/`, {
            checkout_session_id: sessionId
        });
        if (response && response.status == 200 && response.data) {
            return response.data;
        }
    } catch (e: any) {
        console.error(e.message);
    }
}

export default {
    GetOrder
}