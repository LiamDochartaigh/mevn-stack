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

const activateAccount = async (req, res, next) => {
    try {
        const token = req.params.token;
        await userService.ActivateAccount(token);
        res.status(200).json({ message: "Email confirmed." });
    }
    catch (e) {
        console.error("Error Confirming Email:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });    }
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
        res.status(409).json({ message: "An error occured. Please Try Again Later." });
    }
}

const validateUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies["access-token"];
        const refreshToken = req.cookies["refresh-token"];
        let user = await userService.ValidateUser(accessToken);
        if(!user) {
            user = await userService.RefreshUser(refreshToken);
            res.cookie("access-token", user.access_token, defaultCookie(15 * 60 * 1000));
            res.cookie("refresh-token", user.refresh_token, defaultCookie(7 * 24 * 60 * 60 * 1000));
        }
        return res.sendStatus(200);
    }
    catch (e) {
        console.error("Error refreshing user:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

const logIn = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await userService.LogInUser(email, password);
        res.cookie("access-token", user.access_token, defaultCookie(15 * 60 * 1000));
        res.cookie("refresh-token", user.refresh_token, defaultCookie(7 * 24 * 60 * 60 * 1000));
        res.sendStatus(200);
    }
    catch (e){
        console.error("Couldn't Log user In:", e.message);
        res.status(401).json({ message: "Invalid email or password." });
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
        console.error("Error Logging Out:", e.message);
        res.sendStatus(500);
    }
}

const resetUserPasswordRequest = async(req, res, next) => {
    try {
        const email = req.body.email;
        await userService.ResetUserPasswordRequest(email);
        res.sendStatus(200);
    }
    catch (e) {
        console.error("Error requesting password reset:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

const validatePasswordResetToken = async (req, res, next) => {
    try {
        const token = req.body.token;
        await userService.ValidatePasswordResetToken(token);
        res.sendStatus(200);
        }
    catch (e) {
        console.error("Error validating password reset token:", e.message);
        res.status(403).json({ message: "An error occured. Please Try Again Later." });
    }
}

module.exports = {
    registerUser,
    validateUser,
    logOut,
    logIn,
    activateAccount,
    resetUserPasswordRequest,
    validatePasswordResetToken
}