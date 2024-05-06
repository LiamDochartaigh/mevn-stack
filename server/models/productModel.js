const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image_URL: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Product = model("Product", ProductSchema);
module.exports = { Product };