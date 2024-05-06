const { StripeCheckoutSession } = require('../services/paymentService');
const { GetProduct } = require('../services/productService');

const stripeCheckoutSession = async (req, res, next) => {
    try {
        const user = req.user;
        const products = req.body.products;
        const formattedProducts = await Promise.all(products.map(async (productData) => {
            const product = await GetProduct(productData.product_id);
            if(!product) {throw new Error("Product not found")};
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                imageURL: product.image_URL,
                price: product.price,
                quantity: productData.quantity
            };
        }));
        const stripeSession = await StripeCheckoutSession(user, formattedProducts, req.body.success_url, req.body.cancel_url);
        res.status(200).json(stripeSession.url);
    }
    catch (e) {
        console.error("Error Initiating Stripe Checkout:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

module.exports = {
    stripeCheckoutSession
};