const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const { payment } = require('../controllers');
const {authenticate} = require('../middleware/auth');

const validateStripeCheckout = [
    check('product_id').notEmpty().withMessage('Product ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ message: "An error occured. Please Try Again Later." });
        }
        next();
    }
];

router.post("/payment/stripe-checkout-session", validateStripeCheckout, authenticate, payment.stripeCheckoutSession);

module.exports = router;
