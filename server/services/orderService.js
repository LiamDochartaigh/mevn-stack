const {Order} = require('../models/orderModel');
const {sendNewOrderEmail} = require('./emailService');

async function CreateOrder(
    userID,
    customerEmail,
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
        customer_email: customerEmail,
        products: products,
        order_Total: totalCost,
        purchase_Date: purchaseDate,
        status: status,
        payment_Method: paymentMethod,
        stripe_Session_ID: stripeSessionID,
        internal_Session_ID: internalSessionID,
        notes: notes
    });

    //Send order email to user
    await sendNewOrderEmail(order.customer_email, order);
    return await order.save();
}

//Only valid user should be able to fetch order
async function GetOrderBySessionID(sessionID, userId) {
    return await Order.findOne({internal_Session_ID: sessionID, user_Id: userId});
}

module.exports = { CreateOrder, GetOrderBySessionID };
