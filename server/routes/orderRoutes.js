const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const { order } = require('../controllers');
const {authenticate} = require('../middleware/auth');

const validateGetOrder = [
    check('checkout_session_id').notEmpty().withMessage('Order Session ID Required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ message: "An error occured. Please Try Again Later." });
        }
        next();
    }
];

router.post("/order/retrieve", validateGetOrder, authenticate, order.getOrder);

module.exports = router;
