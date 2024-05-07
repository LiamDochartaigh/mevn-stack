const { Enums } = require('mailgun.js');
const { Schema, model } = require('mongoose');

const CheckoutSessionSchema = new Schema({
    user_Id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        Enums: ['pending', 'completed', 'cancelled'],
    },
    session_type: {
        type: String,
        required: true,
        default: 'stripe',
        Enums: ['stripe', 'paypal'],
    },
}, { timestamps: true });

const CheckoutSession = model("CheckoutSession", CheckoutSessionSchema);
module.exports = { CheckoutSession };