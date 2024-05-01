const {RegisterOrLoginGoogleUser} = require('./userService');
const {OAuth2Client} = require('google-auth-library');

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

async function AuthGoogle(code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload['email'];
    const picture = payload['picture'];

    const user = RegisterOrLoginGoogleUser(email, picture);
    return user;
}

module.exports = {
    AuthGoogle
};