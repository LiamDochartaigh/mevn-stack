const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const organzationName = process.env.ORGANIZATION_NAME; 

async function sendWelcomeEmail(to) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${organzationName} <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: `Welcome To ${organzationName}`,
      template: "welcome_template",
      'h:X-Mailgun-Variables': JSON.stringify(
        { organization_name: organzationName }
      )
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

async function sendConfirmationEmail(to, confirmationToken) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${organzationName} <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: 'Please Verify Your Hexeum Account',
      template: "confirmation_template",
      'h:X-Mailgun-Variables': JSON.stringify(
        { account_confirmation_link: `${process.env.CLIENT_URL}activate/?token=${confirmationToken}`,
        organization_name: organzationName}
      )
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

async function sendPasswordResetEmail(to, resetToken) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${organzationName} <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: 'Password Reset Request',
      template: "password_reset_template",
      'h:X-Mailgun-Variables': JSON.stringify(
        { password_reset_link: `${process.env.CLIENT_URL}recovery/?token=${resetToken}`,
        organization_name: organzationName}

      )
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

module.exports = { sendConfirmationEmail, sendPasswordResetEmail, sendWelcomeEmail };