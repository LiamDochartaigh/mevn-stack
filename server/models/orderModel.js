const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    user_Id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product_ID: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            unit_Price: {
                type: Number,
                required: true,
            }
        }
    ],
    order_Total: {
        type: Number,
        required: true,
    },
    purchase_Date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'cancelled'],
    },
    payment_Method: {
        type: String,
        required: true,
        enum: ['Stripe', 'PayPal'],
    },
    internal_Session_ID: {
        type: String,
        required: true,
    },
    stripe_Session_ID: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Order = model("Order", OrderSchema);
module.exports = { Order };