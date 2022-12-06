const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Jurgen" jurgen@gmail.com', // sender address
    to, // list of receivers
    subject, // It is recommended to add these values in .env file
    html,
  });
};

module.exports = sendEmail;
