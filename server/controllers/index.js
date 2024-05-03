const user = require("./userController");
const misc = require("./miscController");
const auth = require("./authController");
const payment = require("./paymentController");
const webhook = require("./webhookController");

module.exports = {
    user,
    misc,
    auth,
    payment,
    webhook
}