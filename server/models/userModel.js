const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  email_confirmed:{
    type: Boolean,
    default: false
  },
  confirmation_token: {
    type: String,
    default: ""
  },
  confirmation_token_expires: {
    type: Date,
    default: Date.now
  },
  access_token: {
    type: String,
    default: ""
  },
  refresh_token: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const User = model("User", UserSchema);
module.exports = { User };
