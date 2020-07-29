let nodemailer = require('nodemailer')
let emailTemplate = require('./emailTemplate')

function sendEmail (email) {
    console.log(email,' ada email');
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'codebeast.id@gmail.com',
          pass: process.env.PASSWORD
        }
      });
      
      let mailOptions = {
        from: 'codebeast.id@gmail.com',
        to: `${email}`,
        subject: 'Promo Baru',
        html: emailTemplate
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error, 'error send email');
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = sendEmail

