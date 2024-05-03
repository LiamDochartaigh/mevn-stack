const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const { webhook } = require('../controllers');
const bodyParser = require('body-parser');

const validateStripeCheckoutComplete = [
    check('stripe-signature').notEmpty().withMessage('Incorrectly Formed Webhook Request'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ message: "An error occured. Please Try Again Later." });
        }
        next();
    }
];

router.post("/webhook/stripe-complete", bodyParser.raw({type: 'application/json'}), validateStripeCheckoutComplete, webhook.stripeCheckoutComplete);

module.exports = router;
