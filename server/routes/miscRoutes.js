const express = require('express');
const router = express.Router();
const {misc} = require('../controllers');

router.get("/status", misc.getStatus);
module.exports = router;
