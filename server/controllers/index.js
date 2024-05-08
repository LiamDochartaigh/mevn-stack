const user = require("./userController");
const misc = require("./miscController");
const auth = require("./authController");
const payment = require("./paymentController");
const webhook = require("./webhookController");
const product = require("./productController");
const order = require("./orderController");

module.exports = {
    user,
    misc,
    auth,
    payment,
    webhook,
    product,
    order
}