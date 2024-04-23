const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

async function sendConfirmationEmail(to, subject, confirmationToken) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Hexeum <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: subject,
      template: "confirmation_template",
      'h:X-Mailgun-Variables': JSON.stringify(
        { account_confirmation_link: `${process.env.CLIENT_URL}activate/${confirmationToken}`,
        organization_name: 'Hexeum'}
      )
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

async function sendPasswordResetEmail(to, subject, resetToken) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Hexeum <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: subject,
      template: "password_reset_template",
      'h:X-Mailgun-Variables': JSON.stringify(
        { password_reset_link: `${process.env.CLIENT_URL}recovery/?token=${resetToken}`,
        organization_name: 'Hexeum'}

      )
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };