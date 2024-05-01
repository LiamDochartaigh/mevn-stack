const { User } = require("../models/userModel");
const { GenerateJWT, GenerateRefreshToken, GenerateEmailResetToken } = require("./authService");
const { sendConfirmationEmail, sendPasswordResetEmail } = require("./emailService");
const crypto = require("crypto");

async function RegisterUser(email, password) {
  let user = await GetUserByEmail(email);
  if (user) { throw new Error("User already exists"); }
  user = await User.create({ email, password, authType: "local"});
  SendEmailConfirmation(user);
  await AuthenticateUser(user);
  return user;
}

async function RegisterOrLoginGoogleUser(email, picture) {
  const user = await GetUserByEmail(email);
  if (user) {
    user.user_avatar_URL = picture;
    user.authType = "google";
    user.password = '';
    await user.save();
    await AuthenticateUser(user); return user;
  }
  else {
    const newUser = await User.create({ email, user_avatar_URL: picture, email_confirmed: true, authType: "google"});
    await AuthenticateUser(newUser);
    return newUser;
  }
}

async function SendEmailConfirmation(user) {
  if (!user) { throw new Error("Invalid User") }
  if (user.email_confirmed) { throw new Error("Email already confirmed"); }
  // If the ten minutes have not passed since the last confirmation email was sent
  if (user.confirmation_token_expires - (3300000) > Date.now()) { throw new Error("Confirmation token already sent") }

  const confirmationToken = crypto.randomBytes(20).toString('hex');
  user.confirmation_token = confirmationToken;
  user.confirmation_token_expires = Date.now() + 3600000;
  await user.save();
  await sendConfirmationEmail(
    user.email,
    "Please Verify Your Hexeum Account",
    confirmationToken);
}

async function ActivateAccount(token) {
  const user = await User.findOne({ confirmation_token: token, confirmation_token_expires: { $gt: Date.now() } });
  if (!user) { throw new Error('Invalid token or token expired') }
  user.email_confirmed = true;
  user.confirmation_token = '';
  user.confirmation_token_expires = '';
  await user.save();
}

async function ValidateUser(accessToken) {
  let user = await User.findOne({ access_token: accessToken });
  if (user) { return user; }
}

async function RefreshUser(refreshToken) {
  const user = await User.findOne({ refresh_token: refreshToken });
  if (!user) { throw new Error('Invalid Access or Refresh token'); }
  await AuthenticateUser(user);
  return user;
}

async function AuthenticateUser(user) {
  if (!user || !user._id || !user.save) { throw new Error("User not found"); }
  const jwt = GenerateJWT(user.id);
  const refreshToken = GenerateRefreshToken();
  await SetUsersRefreshToken(user, refreshToken);
  await SetUsersAccessToken(user, jwt);
}

async function LogInUser(email, password) {
  const user = await GetUserByEmail(email);
  if (!user) { throw new Error("User not found"); }
  if(user.authType !== "local") { throw new Error("Non native user"); }
  if (user.password !== password) { throw new Error("Invalid password"); }
  await AuthenticateUser(user);
  return user;
}

async function LogOutUser(user) {
  if (!user || !user._id || !user.save) {
    throw new Error("User not found");
  }
  await DeleteUsersAccessToken(user);
  await DeleteUsersRefreshToken(user);
}

async function GetUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
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

async function ResetUserPasswordRequest(email) {
  const user = await GetUserByEmail(email);
  if (!user || !user._id || !user.save) { throw new Error("User not found"); }
  // If the five minutes have not passed since the last password reset email was sent
  if (user.password_reset_expires - (900000) > Date.now()) { throw new Error("Password reset token already sent") }

  const resetToken = GenerateEmailResetToken();
  user.password_reset_token = resetToken;
  user.password_reset_expires = Date.now() + 1200000;
  await sendPasswordResetEmail(user.email, "Password Reset Request", resetToken);
  await user.save();
}

async function ValidatePasswordResetToken(token) {
  const user = await User.findOne({ password_reset_token: token, password_reset_expires: { $gt: Date.now() } });
  if (!user) { throw new Error('Invalid token or token expired'); }
  return user;
}

async function ChangePassword(token, password) {
  const user = await User.findOne({ password_reset_token: token, password_reset_expires: { $gt: Date.now() } });
  if (!user) { throw new Error('Invalid token or token expired'); }
  user.password = password;
  user.password_reset_token = "";
  user.password_reset_expires = "";
  user.password_reset_token_createdAt = "";
  await user.save();
}

module.exports = {
  RegisterUser,
  LogOutUser,
  ActivateAccount,
  ValidateUser,
  RefreshUser,
  LogInUser,
  ResetUserPasswordRequest,
  ValidatePasswordResetToken,
  ChangePassword,
  GetUserByEmail,
  SendEmailConfirmation,
  RegisterOrLoginGoogleUser
};
