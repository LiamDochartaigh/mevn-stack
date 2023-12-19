const { sign, verify } = require('jsonwebtoken');
const { randomBytes } = require('crypto');

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

module.exports = { GenerateJWT, GenerateRefreshToken, VerifyToken }