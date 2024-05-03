const {StripeCheckoutComplete} = require('../services/paymentService');

const stripeCheckoutComplete = async (req, res, next) => {
    try {
        const sig = req.headers['stripe-signature'];
        await StripeCheckoutComplete(req.body, sig);
        res.status(200);
    }
    catch (e) {
        console.error("Error Processing Checkout Complete Webhook: ", e.message);
        res.status(400).json("Webhook Error");
    }
}

module.exports = {
    stripeCheckoutComplete
};