const mailgun = require('mailgun-js');
const {
  confirmationBody
} = require('./html-generator');

const mailgunClient = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendRawEmail = async (from = process.env.MAILGUN_FROM_EMAIL, to, subject, html) => {
  try {
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

const sendConfirmation = async (data, { from , to, subject }) => {
  try {
    const html = confirmationBody(data)
    return mailgunClient.messages().send({ from, to, subject, html });
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
};

module.exports = {
  sendRawEmail,
  sendConfirmation,
};