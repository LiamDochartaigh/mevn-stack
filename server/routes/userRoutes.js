const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { user } = require('../controllers');
const passport = require('../middleware/passport');

const router = Router();

const validateRegisterUser = [
  check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
  check('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateRefreshToken = [
  check('refresh-token').notEmpty().withMessage('Refresh token is required').isString().withMessage('Refresh token must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateConfirmationToken = [
  check('token').notEmpty().withMessage('Confirmation token is required').isString().withMessage('Confirmation token must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post("/register", validateRegisterUser, user.registerUser);
router.get("/refresh", validateRefreshToken, user.refreshUser);
router.get("/confirm-token", validateConfirmationToken, user.confirmEmail);
router.get("/logout", passport.authenticate('jwt', { session: false }), user.logOut);

module.exports = router;