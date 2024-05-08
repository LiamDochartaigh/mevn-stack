const { GetOrderBySessionID } = require('../services/orderService');

const getOrder = async (req, res, next) => {
    try {
        const user = req.user;
        const sessionId = req.body.checkout_session_id;
        const order = await GetOrderBySessionID(sessionId, user._id);
        res.status(200).json(order);
    }
    catch (e) {
        console.error("Error Fetching Order:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

module.exports = {
    getOrder
};