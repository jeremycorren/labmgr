const express = require('express');
const Lab = require('../models/lab.model');
const transporter = require('../email/transporter');
const generateBody = require('../email/generateBody');
const footer = require('../email/footer');
const moment = require('moment');
const Constants = require('../utils/constants');

const router = express.Router();

router.get('/findLabs', (req, res) => {
  Lab.find({}).sort({
    createTimestamp: -1
  }).exec((err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

router.get('/findLabs/:lastName', (req, res) => {
  Lab.find({ 
    'patient.lastName': {
      '$regex' : req.params.lastName, 
      '$options' : 'i'
    }
  }, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

router.post('/createLab', (req, res) => {
  const lab = new Lab({
    createTimestamp: new Date(),
    updateTimestamp: new Date(),
    reminderTimestamp: req.body.reminderTimestamp,
    status: 'New',
    reminderCount: 0,
    labTypes: req.body.labTypes,
    patient: {
      firstName: req.body.patientFirstName,
      lastName: req.body.patientLastName,
      birthdate: req.body.patientBirthdate,
      email: req.body.patientEmail,
      phoneNumber: req.body.patientPhoneNumber
    }
  });

  lab.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send('Lab created.');
    }
  })
});

router.put('/updateLab/:id', (req, res) => {
  Lab.findOneAndUpdate({
    _id: req.params.id
  }, {
    updateTimestamp: new Date(),
    reminderTimestamp: req.body.reminderTimestamp,
    labTypes: req.body.labTypes,
    patient: {
      firstName: req.body.patientFirstName,
      lastName: req.body.patientLastName,
      birthdate: req.body.patientBirthdate,
      email: req.body.patientEmail,
      phoneNumber: req.body.patientPhoneNumber
    }
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Lab updated.');
    }
  });
});

router.put('/closeLab/:id', (req, res) => {
  Lab.findOneAndUpdate({
    _id: req.params.id
  }, {
    status: Constants.Status.COMPLETE
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Lab completed.');
    }
  });
});

router.put('/incompleteLab/:id', (req, res) => {
  Lab.findOneAndUpdate({
    _id: req.params.id
  }, {
    status: Constants.Status.INCOMPLETE
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Lab marked incomplete.');
    }
  });
});

router.post('/remindLab/:id', (req, res) => {
  Lab.findOne({
    _id: req.params.id
  }, (err, lab) => {
    if (err) {
      res.status(400).send(err);
    } else if (lab) {
      transporter.sendMail({
        from: 'prosaicSolutions@hotmail.com',
        to: lab.patient.email,
        subject: 'Lab Reminder', 
        html: '<p>' + generateBody(lab) + '</p>' + footer
      }, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          lab.reminderCount = ++lab.reminderCount;
          lab.reminderTimestamp = moment().add(14, 'days').toDate();
          lab.status = 'Reminded';
          lab.save((err) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).send('Reminder email sent, lab updated.');
            }
          });
        }
      });
    }
  });
});

router.delete('/deleteLabs', (req, res) => {
  Lab.deleteMany({
    _id: { $in: req.body.labIds }
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Lab deleted.');
    }
  })
});

module.exports = router;