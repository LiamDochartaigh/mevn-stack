const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./userModel.js").User(mongoose);
db.order = require("./orderModel.js").Order(mongoose);
db.product = require("./productModel.js").Product(mongoose);

module.exports = db;