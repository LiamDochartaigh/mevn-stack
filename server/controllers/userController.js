const { model } = require("mongoose");
const userService = require("../services/userService");

function defaultCookie(age) {
    return {
        maxAge: age,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}

const confirmEmail = async (req, res, next) => {
    try {
        const token = req.query.token;
        await userService.ConfirmEmail(token);
        res.status(200).json({ message: "Email confirmed." });
    }
    catch (e) {
        console.error("Error Confirming Email:", e.message);
        res.status(400).json({ message: "An error occured. Please Try Again Later." });    }
}

const registerUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userService.RegisterUser(email, password);
        res.cookie("access-token", user.access_token, defaultCookie(15 * 60 * 1000));
        res.cookie("refresh-token", user.refresh_token, defaultCookie(7 * 24 * 60 * 60 * 1000));
        res.sendStatus(201);
    }
    catch (e) {
        console.error("Error Registering User:", e.message);
        res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
}

const refreshUser = async (req, res, next) => {
    try {
        const refreshToken = req.cookies["refresh-token"];
        const responseData = await userService.RefreshUser(refreshToken);
        res.cookie("access-token", responseData.access_token, defaultCookie(15 * 60 * 1000));
        res.cookie("refresh-token", responseData.refresh_token, defaultCookie(7 * 24 * 60 * 60 * 1000));
        res.sendStatus(200);
    }
    catch (e) {
        console.error("Error refreshing user:", e.message);
        res.status(400).json({ message: "An error occured. Please Try Again Later." });
    }
}

const logOut = async (req, res, next) => {
    try {
        const user = req.user;
        await userService.LogOutUser(user);
        res.clearCookie("access-token");
        res.clearCookie("refresh-token");
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    registerUser,
    refreshUser,
    logOut,
    confirmEmail
}