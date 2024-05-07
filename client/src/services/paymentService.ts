import { baseAXios } from "./axiosService"
import { Product } from "./productService";

export async function initiateStripePurchase(products: Product[]) {
    try {
        const mappedProducts = products.map(product => {
            return {
                product_id: product._id,
                quantity: 1
            }
        });
        const response = await baseAXios.post(`/payment/stripe-checkout-session/`, {
            products: mappedProducts,
            success_url: import.meta.env.VITE_APP_BASE_URL + 'order-complete',
            cancel_url: import.meta.env.VITE_APP_BASE_URL
        });
        if (response && response.status == 200) {
            return response.data;
        }
    }
    catch (e: any) {
        console.error(e.message);
    }
}


export default
    { initiateStripePurchase }