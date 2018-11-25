const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", 
  secureConnection: false, 
  port: 587, 
  tls: { ciphers:'SSLv3' },
  auth: {
    user: 'prosaicSolutions@hotmail.com',
    pass: 'JSONgoldman'
  }
});