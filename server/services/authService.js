const { sign, verify } = require('jsonwebtoken');
const { randomBytes } = require('crypto');

function DefaultCookie(age) {
    return {
        maxAge: age,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}

function GenerateJWT(userID) {
    const payload = {
        id: userID
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '15m',
    };
    const token = sign(payload, secret, options);
    return token;
}

function GenerateRefreshToken() {
    return randomBytes(40).toString('hex');
}

function VerifyToken(token) {
    const secret = process.env.JWT_SECRET;
    return verify(token, secret);
}

function GenerateEmailResetToken() {
    return randomBytes(20).toString('hex');
}

module.exports = {
    GenerateJWT,
    GenerateRefreshToken,
    VerifyToken,
    GenerateEmailResetToken,
    DefaultCookie,
}