const { Router } = require('express');
const router = Router();
const { body, check, validationResult } = require('express-validator');
const { payment } = require('../controllers');
const {authenticate} = require('../middleware/auth');

const urlConfig = {
    protocols: ['http', 'https'],
    require_protocol: true,
    allow_underscores: true,
    require_tld: false,
    allow_trailing_dot: true,
    allow_protocol_relative_urls: true,
};

const validateStripeCheckout = [
    body('products').isArray().withMessage('Products must be an array'),
    body('products.*.product_id').isString().withMessage('Product ID must be a string'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
    check('success_url').isURL(urlConfig).withMessage('Success URL must be a valid URL'),
    check('cancel_url').isURL(urlConfig).withMessage('Cancel URL must be a valid URL'),
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
