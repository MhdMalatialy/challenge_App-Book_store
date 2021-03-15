const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../src/.env' })
const sendEmail = async function (email, header, subject, body) {
try{
  if (email.match(/(@test.com||@example.com)$/)[0]) {
    return console.log(email);
  }

 const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,

    },
    tls: {
      rejectUnauthorized: false,
    },
  });
 
  await transporter.sendMail({
    from: '"Book-Store" <email>',
    to: email, 
    subject,
    html: `<html><h1> ${header}. </h1><b>${body}.</b>  </html>`, // html body
  });
}catch(e){
  console.log(e)
}
};
module.exports = sendEmail;
