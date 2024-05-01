const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { user } = require('../controllers');
const {authenticate} = require('../middleware/auth');

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
  check('token').notEmpty().withMessage('Token is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(403).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

const validatePasswordChange = [
  check('token').notEmpty().withMessage('Token is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(403).json({ message: "An error occured. Please Try Again Later." });
    }
    next();
  }
];

router.post("/user/login", validateUserLogIn, user.logIn);
router.post("/user/register", validateRegisterUser, user.registerUser);
router.get("/user/validate", authenticate, user.validateUser);
router.get("/user/logout", authenticate, user.logOut);
router.post("/user/activate/", validateConfirmationToken, user.activateAccount);
router.post("/user/password-reset", validatePasswordResetRequest, user.resetUserPasswordRequest);
router.post("/user/password-reset/validate", validatePasswordReset, user.validatePasswordResetToken);
router.post("/user/password-reset/change", validatePasswordChange, user.changePassword);
router.get("/user/resend-confirmation", authenticate, user.sendConfirmationEmail);

//Get rid of after testing
router.get("/user/", authenticate, user.getUser);

module.exports = router;