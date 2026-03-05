const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

exports.sendApprovalEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'MEF Registration Approved ✅',
    html: `<h3>Hello ${name},</h3><p>Your entrepreneur registration has been verified. You can now access full dashboard features.</p>`
  };
  await transporter.sendMail(mailOptions);
};