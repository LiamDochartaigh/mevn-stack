const {Order} = require('../models/orderModel');

async function CreateOrder(
    userID, 
    products,
    totalCost,
    purchaseDate,
    status,
    paymentMethod,
    stripeSessionID,
    notes)
    {
    const order = await Order.create({
        user_ID: userID,
        products: products,
        order_Total: totalCost,
        purchase_Date: purchaseDate,
        status: status,
        payment_Method: paymentMethod,
        stripe_Session_ID: stripeSessionID,
        notes: notes
    });

    return await order.save();
}

module.exports = { CreateOrder };
