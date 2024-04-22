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
      console.log(errors.array());
      return res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

const validateUserLogIn = [
  check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
  check('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

const validateUserValidate = [
  check('refresh-token').notEmpty().withMessage('Refresh token is required').isString().withMessage('Refresh token must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(401).json({ message: "User Could Not Be Authenticated." });
    }
    next();
  }
];

const validateConfirmationToken = [
  check('token').notEmpty().withMessage('Confirmation token is required').isString().withMessage('Confirmation token must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

const validatePasswordResetRequest = [
  check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

const validatePasswordReset = [
  check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

router.post("/login", validateUserLogIn, user.logIn);
router.post("/register", validateRegisterUser, user.registerUser);
router.get("/validate", validateUserValidate, user.validateUser);
router.get("/logout", passport.authenticate('jwt', { session: false }), user.logOut);
router.get("/activate/:token", validateConfirmationToken, user.activateAccount);
router.post("/password-reset", validatePasswordResetRequest, user.resetUserPasswordRequest);

module.exports = router;