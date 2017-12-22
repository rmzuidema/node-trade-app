var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: 'robert.m.zuidema@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Validate your email Address',
  text: 'That was easy!'
};


var sendValidationEmail = function(to, from, message) {
    mailOptions.to=to;
    mailOptions.from=from;
    mailOptions.message=message;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    });
}

module.exports = {sendValidationEmail}