const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const generalRoutes = require('./miscRoutes');

router.use(userRoutes);
router.use(generalRoutes);

module.exports = router;