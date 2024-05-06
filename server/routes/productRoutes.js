const { Router } = require('express');
const router = Router();
const { product } = require('../controllers');

router.get("/product/", product.getProducts);

module.exports = router;
