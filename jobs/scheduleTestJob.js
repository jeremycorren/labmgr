const cron = require('node-schedule');
const Lab = require('../models/lab.model');

let job = () => {
  Lab.where({
    reminderTimestamp: { $lte : new Date() }, 
    status: { $nin: [
      Constants.Status.COMPLETE, 
      Constants.Status.REMINDABLE
    ]}
  }).updateMany({ 
    status: Constants.Status.REMINDABLE, 
    updateTimestamp: new Date() 
  }, (err, docs) => {
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