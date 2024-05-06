const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const generalRoutes = require('./miscRoutes');
const authRoutes = require('./authRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');

router.use(userRoutes);
router.use(generalRoutes);
router.use(authRoutes);
router.use(paymentRoutes);
router.use(productRoutes);

module.exports = router;