require("dotenv").config();

let config = {
    development: {
        url: process.env.DB_URL
    }
}

//Use this for switching db configs
module.exports = config.development;