const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../controllers');

const validateAuthGoogle = [
    check('code').notEmpty().withMessage('Code is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ message: "An error occured. Please Try Again Later." });
        }
        next();
    }
];

router.post("/auth/google", validateAuthGoogle, auth.authGoogle);

module.exports = router;
