const { sign, verify } = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function DefaultCookie(age) {
    return {
        maxAge: age,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
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


async function HashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Hashing error:', error);
        throw error;
    }
}

async function VerifyPassword(password, storedHash) {
    try {
        const match = await bcrypt.compare(password, storedHash);
        return match;
    } catch (error) {
        console.error('Password verification error:', error);
        throw error;
    }
}


module.exports = {
    GenerateJWT,
    GenerateRefreshToken,
    VerifyToken,
    GenerateEmailResetToken,
    DefaultCookie,
    HashPassword,
    VerifyPassword
}