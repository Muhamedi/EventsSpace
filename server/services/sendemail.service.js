const sgMail = require('@sendgrid/mail');
const CONSTANTS = require('../constants');
sgMail.setApiKey(CONSTANTS.SENDGRID_API_KEY);

const sendEmail = emailContent => {

const { to, subject, template } = emailContent;

const msg = {
    to,
    from: 'muhamedkrasniqibr@gmail.com',
    subject,
    html: template,
  };
  sgMail.send(msg);
}

module.exports = sendEmail;