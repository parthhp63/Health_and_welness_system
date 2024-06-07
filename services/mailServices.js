const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail =  async(to, subject, text, html, attachments) => {

 
  
  // Create a transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'patilparth596@gmail.com',
        pass: 'vcrd ihit pelh yjfp'
      }
    });
  
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to,                       // List of receivers
      subject: subject,             // Subject line
      text: text,                   // Plain text body
      html: html,                   // HTML body
    };
    if(attachments){
      const absolutePath = path.resolve(attachments); // Resolve the absolute path
      mailOptions.attachments = [
        {
            filename: path.basename(attachments),
            path: absolutePath,
        }
      ]   
    }
  
    // Send mail with defined transport object
    return await transporter.sendMail(mailOptions)
  } catch (e) {
    throw new Error('Error sending message');
  }
};

module.exports = { sendEmail };