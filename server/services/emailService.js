const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

async function sendEmail(to, subject, text){
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Hexeum <${process.env.MAILGUN_FROM}>`,
      to: to,
      subject: subject,
      text: text,
      html: "<h1>Testing some Mailgun awesomeness!</h1>"
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email', error);
  }
}

module.exports = { sendEmail };