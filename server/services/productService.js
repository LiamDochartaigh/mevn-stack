const { Product } = require('../models/productModel');
const mongoose = require('mongoose');

async function GetProduct(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return await Product.findById(id);
    } else {
        throw new Error('Invalid Product ID');
    }
}
async function GetProducts() {
    return await Product.find();
}

module.exports = {
    GetProduct, 
    GetProducts 
};