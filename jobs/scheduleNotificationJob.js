const cron = require('node-schedule');
const transporter = require('../email/transporter');
const Lab = require('../models/lab.model');

let notificationJob = () => {
  Lab.where({
    reminderTimestamp : { $lte : new Date() }, 
    status : { $nin : ['Closed', 'Remindable'] }
  }).updateMany({
    status : 'Remindable', //redundant for Remindable. let's first fetch, then update/save.
    updateTimestamp : new Date() 
  }, (err, docs) => {
    if (err) {
      console.log(err);
    } else if (docs.nModified > 0) {
      transporter.sendMail({
        from: 'prosaicSolutions@hotmail.com',
        to: 'gabelevinmusic@gmail.com',
        subject: 'You have ' + docs.nModified + ' new reminder(s) due', 
        //html should contain link to localhost:3000, ultimately the domain host
        html: '<p>You have ' + docs.nModified + ' new reminder(s) due</p>'
      }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email notification sent to user.'); 
        }            
      });
    }
  })
};

const scheduleNotificationJob = () => {
  var rule = new cron.RecurrenceRule();
  rule.dayOfWeek = [1,4];
  rule.hour = 5;
  cron.scheduleJob(rule, notificationJob);
};

module.exports = scheduleNotificationJob;