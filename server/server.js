const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require('http');
const server = http.createServer(app);
const rateLimit = require('express-rate-limit');
const db = require("./models");

// dotenv
require("dotenv").config();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);
app.set('trust proxy', 1);

db.mongoose.set("strictQuery", false);
db.mongoose.connect(db.url)

db.mongoose.connection.on('error', (error) => {
  console.error('Connection error:', error);
  // Add your error handling code here
});

db.mongoose.connection.once('open', () => {
  console.log('Database connection successful');
});

//Routes
app.use("/", require("./routes"));

// Provide a default port
const port = process.env.PORT || 80;

// Listen to server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});