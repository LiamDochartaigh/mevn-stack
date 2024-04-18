const { User } = require("../models/userModel");
const { GenerateJWT, GenerateRefreshToken } = require("./authService");
const { sendEmail } = require("./emailService");
const crypto = require("crypto");

async function RegisterUser(email, password) {
  let user = await GetUserByEmail(email);
  if (user) { throw new Error("User already exists"); }
  user = await User.create({ email, password });
  
  const confirmationToken = crypto.randomBytes(20).toString('hex'); 
  user.confirmation_token = confirmationToken;
  user.confirmation_token_expires = Date.now() + 3600000;
  await user.save();
  
  await sendEmail(
  user.email,
  "Please Verify Your Hexeum Account", 
  `Please click this link to confirm your email: ${process.env.CLIENT_URL}/confirm-email?token=${confirmationToken}`);

  await AuthenticateUser(user);
  return user;
}

async function ConfirmEmail(token) {
  const user = await User.findOne({ confirmation_token: token, confirmation_token_expires: { $gt: Date.now() } });
  if (!user) { throw new Error('Invalid token or token expired')}
  user.email_confirmed = true;
  user.confirmation_token = undefined;
  user.confirmation_token_expires = undefined;
  await user.save();
}

async function RefreshUser(refreshToken) {
  const user = await GetUserFromRefreshToken(refreshToken);
  if (!user) { throw new Error('Invalid refresh token') }
  return await AuthenticateUser(user);
}

async function AuthenticateUser(user) {
  if (!user || !user._id || !user.save) { throw new Error("User not found"); }
  const jwt = GenerateJWT(user.id);
  const refreshToken = GenerateRefreshToken();
  await SetUsersRefreshToken(user, refreshToken);
  await SetUsersAccessToken(user, jwt);
}

async function GetUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

async function GetUserFromRefreshToken(token) {
  const user = await User.findOne({ refresh_token: token });
  return user;
}

async function LogOutUser(user) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  await DeleteUsersAccessToken(user);
  await DeleteUsersRefreshToken(user);
}

async function SetUsersRefreshToken(user, token) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  user.refresh_token = token;
  await user.save();
}

async function DeleteUsersRefreshToken(user) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  user.refresh_token = "";
  await user.save();
}

async function DeleteUsersAccessToken(user) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  user.access_token = "";
  await user.save();
}

async function SetUsersAccessToken(user, token) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  user.access_token = token;
  await user.save();
}

module.exports = { RegisterUser, LogOutUser, RefreshUser, ConfirmEmail };
