const { StripeCheckoutSession } = require('../services/paymentService');

const stripeCheckoutSession = async (req, res, next) => {
    try {
        const user = req.user;
        const product_id = req.body.product_id;
        const session = await StripeCheckoutSession(user);
        res.status(200).json();
    }
    catch (e) {
        console.error("Error Initiating Stripe Checkout:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

module.exports = {
    stripeCheckoutSession
};