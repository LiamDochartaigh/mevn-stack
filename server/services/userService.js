const { User } = require("../models/userModel");
const { GenerateJWT, GenerateRefreshToken } = require("./authService");
const { sendConfirmationEmail } = require("./emailService");
const crypto = require("crypto");

async function RegisterUser(email, password) {
  let user = await GetUserByEmail(email);
  if (user) { throw new Error("User already exists"); }
  user = await User.create({ email, password });

  const confirmationToken = crypto.randomBytes(20).toString('hex');
  user.confirmation_token = confirmationToken;
  user.confirmation_token_expires = Date.now() + 3600000;
  await user.save();

  await sendConfirmationEmail(
    user.email,
    "Please Verify Your Hexeum Account",
    `${process.env.CLIENT_URL}/activate/${confirmationToken}`);

  await AuthenticateUser(user);
  return user;
}

async function ActivateAccount(token) {
  const user = await User.findOne({ confirmation_token: token, confirmation_token_expires: { $gt: Date.now() } });
  if (!user) { throw new Error('Invalid token or token expired') }
  user.email_confirmed = true;
  user.confirmation_token = undefined;
  user.confirmation_token_expires = undefined;
  await user.save();
}

async function ValidateUser(accessToken, refreshToken) {
  let user = await User.findOne({ access_token: accessToken });
  if (user) { return user; }
}

async function RefreshUser(refreshToken) {
  const user = await User.findOne({ refresh_token: refreshToken });
  if (!user) { throw new Error('Invalid Access or Refresh token'); }
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

module.exports = { RegisterUser, LogOutUser, ActivateAccount, ValidateUser, RefreshUser };