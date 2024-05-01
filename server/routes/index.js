const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const generalRoutes = require('./miscRoutes');
const authRoutes = require('./authRoutes');

router.use(userRoutes);
router.use(generalRoutes);
router.use(authRoutes);

module.exports = router;