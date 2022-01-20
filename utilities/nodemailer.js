const nodemailer = require("nodemailer");
const config = require("../constants/config");

// Handle email sender with nodemailer
const transporter = nodemailer.createTransport({
  host: config.mail.MAIL_HOST,
  port: config.mail.MAIL_PORT,
  secure: true,
  auth: {
    user: config.mail.MAIL_USERNAME,
    pass: config.mail.MAIL_PASSWORD,
  },
});

const nodemailerUtils = {
  transporter,
};

module.exports = nodemailerUtils;
