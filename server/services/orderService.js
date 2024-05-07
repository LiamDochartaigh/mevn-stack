const {Order} = require('../models/orderModel');

async function CreateOrder(
    userID, 
    products,
    totalCost,
    purchaseDate,
    status,
    paymentMethod,
    stripeSessionID,
    internalSessionID,
    notes)
    {
    const order = await Order.create({
        user_Id: userID,
        products: products,
        order_Total: totalCost,
        purchase_Date: purchaseDate,
        status: status,
        payment_Method: paymentMethod,
        stripe_Session_ID: stripeSessionID,
        internal_Session_ID: internalSessionID,
        notes: notes
    });

    return await order.save();
}

module.exports = { CreateOrder };
