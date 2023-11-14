const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

  const sendEmail=async(email)=>{
    try {
        const info = await transporter.sendMail({ 
            from: '"Upstormed Support 👻" <umar.techsmiths@gmail.com>', 
            to: email, 
            subject: "Contact Response?", 
            text: "Hello World", 
            html: "<b>We have recieved your message and we will reply you shortly.</b>", 
          });
        
          console.log("Message sent: %s", info.messageId);
          return info
    } catch (error) {
        console.log("Error sending email",error);
    }
  }

module.exports={
    sendEmail
}