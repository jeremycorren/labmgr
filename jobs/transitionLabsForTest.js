const cron = require('node-schedule');
const transporter = require('../email/transporter');
const Lab = require('../models/lab.model');
const nodemailer = require('nodemailer');

let job = () => {
  console.log("EXECUTED");
  Lab.where({reminderTimestamp : {$lte : new Date()}, status : {$nin : ['Closed', 'Remindable']}})
    .updateMany({status : "Remindable", updateTimestamp : new Date()}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
};

/* This runs at the fifth second of every minute. It is for test purposes only */
module.exports = () => {
  var rule = new cron.RecurrenceRule();
  rule.dayOfWeek = [0,1,2,3,4,5,6];
  rule.second = 5;
  cron.scheduleJob(rule, job);
}