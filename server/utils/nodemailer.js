const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: true,
  debug: true,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

const sendMail = async (email, secretToken, mode) => {
  try {
    if (mode == "OTP") {
      return await transport.sendMail({
        from: `"College ERP" <${process.env.SMPT_MAIL}>`,
        to: email,
        subject: "OTP Submission",
        html: `
        <h1>Reset Password</h1>
        <p> Here is your otp to change the password ${secretToken} </p>
      `,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = sendMail;
