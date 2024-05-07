const { CheckoutSession} = require('../models/checkoutSessionModel');

async function CreateCheckoutSession(userId, type){
    const internalSession = await CheckoutSession.create({
        user_Id: userId,
        status: "pending",
        session_type: type
    });
    return await internalSession.save();
}

async function CloseCheckoutSession(sessionId){
    const internalSession = await CheckoutSession.findById(sessionId);
    internalSession.status = "completed";
    internalSession.save();
}

module.exports = {
    CreateCheckoutSession,
    CloseCheckoutSession
}