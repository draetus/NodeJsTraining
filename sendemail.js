var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'mauricio199836@hotmail.com',
    pass: '##################'
  }
});

var mailOptions = {
  from: 'mauricio199836@hotmail.com',
  to: 'fariasjrmauricio@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
