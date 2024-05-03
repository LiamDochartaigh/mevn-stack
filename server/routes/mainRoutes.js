const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const generalRoutes = require('./miscRoutes');
const authRoutes = require('./authRoutes');
const paymentRoutes = require('./paymentRoutes');

router.use(userRoutes);
router.use(generalRoutes);
router.use(authRoutes);
router.use(paymentRoutes);


module.exports = router;