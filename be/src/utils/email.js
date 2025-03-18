const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROMNAME, SMTP_FROMEMAIL} = process.env;
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT, // 587, 25
  secure: SMTP_SECURE === "true", // true for port 465, false for other ports
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});
module.exports = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: `"${SMTP_FROMNAME}👻" <${SMTP_FROMEMAIL}>`, 
    to,
    subject,
    html: message, 
  });
  return info;
}