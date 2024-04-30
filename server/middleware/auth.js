const userService = require("../services/userService");
const {DefaultCookie} = require("../services/authService");

const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookies["access-token"];
        const refreshToken = req.cookies["refresh-token"];
        let user = await userService.ValidateUser(accessToken);
        if(!user) {
            user = await userService.RefreshUser(refreshToken);
            res.cookie("access-token", user.access_token, DefaultCookie(15 * 60 * 1000));
            res.cookie("refresh-token", user.refresh_token, DefaultCookie(7 * 24 * 60 * 60 * 1000));
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.error("Error refreshing user:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
};

module.exports = {
    authenticate
};