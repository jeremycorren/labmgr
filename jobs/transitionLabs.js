const cron = require('node-schedule');
const transporter = require('../email/transporter');
const Lab = require('../models/lab.model');
const nodemailer = require('nodemailer');

let job = () => {
  Lab.where({reminderTimestamp : {$lte : new Date()}, status : {$nin : ['Closed', 'Remindable']}})
  .updateMany({status : "Remindable", updateTimestamp : new Date()}, (err, docs) => {
    if (err) {
      console.log(err);
    } else if (docs.nModified > 0) {
      transporter.sendMail({
        from: 'prosaicSolutions@hotmail.com',
        to: 'gabelevinmusic@gmail.com',
        subject: 'You have ' + docs.nModified + ' new reminder(s) due', 
        html: '<p>You have ' + docs.nModified + ' new reminder(s) due</p>'
      }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("reminder email sent") 
        }            
      });
    }
  })
};

/* This runs at 5:00AM every Monday and Thursday, and updates the status to 'Remindable'
for those labs whose 'reminderTimestamp' has passed */
module.exports = () => {
  var rule = new cron.RecurrenceRule();
  rule.dayOfWeek = [1,4];
  rule.hour = 5;
  cron.scheduleJob(rule, job);
}