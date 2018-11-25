const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Lab', new Schema({
  createTimestamp: { type: Date, required: true },
  updateTimestamp: { type: Date, required: true },
  reminderTimestamp: { type: Date, required: true },
  status: { type: String, required: true },
  reminderCount: { type: Number, required: true },
  labTypes: { type: [String], required: true },
  patient: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true }
  }
}));