const {GetProducts} = require('../services/productService');

const getProducts = async (req, res, next) => {
    try {
        const products = await GetProducts();
        res.status(200).json(products);
    }
    catch (e) {
        console.error("Error Processing Checkout Complete Webhook: ", e.message);
        res.status(400).json("Webhook Error");
    }
}

module.exports = {
    getProducts
};