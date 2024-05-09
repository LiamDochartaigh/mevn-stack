import { baseAXios } from "./axiosService"
import { IsDefined } from 'class-validator';
import { validateAndTransform } from '../util/dataValidation';

interface Product {
    product_ID: string;
    quantity: number;
    unit_Price: number;
    name: string;
}

export class Order {
    @IsDefined()
    _id: string;
    @IsDefined()
    order_Total: number;
    @IsDefined()
    products: Product[];

    constructor(id: string, order_Total: number, products: Product[]) {
        this._id = id;
        this.order_Total = order_Total;
        this.products = products;
    }
}

export async function GetOrder(sessionId: string){
    try {
        const response = await baseAXios.post(`/order/retrieve/`, {
            checkout_session_id: sessionId
        });
        if (response && response.status == 200 && response.data) {
            const order = await validateAndTransform(Order, response.data as Order);
            return order;
        }
    } catch (e: any) {
        console.error(e.message);
    }
}

export default {
    GetOrder
}