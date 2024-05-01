const {AuthGoogle} = require('../services/googleAuthService');
const {DefaultCookie} = require('../services/authService');

const authGoogle = async (req, res, next) => {
    try {
        const code = req.body.code;
        const user = await AuthGoogle(code);
        res.cookie("access-token", user.access_token, DefaultCookie(15 * 60 * 1000));
        res.cookie("refresh-token", user.refresh_token, DefaultCookie(7 * 24 * 60 * 60 * 1000));
        res.status(200).json(user);
    }
    catch (e) {
        console.error("Error Authorising User:", e.message);
        res.status(401).json({ message: "An error occured. Please Try Again Later." });
    }
}

module.exports = {
    authGoogle
};