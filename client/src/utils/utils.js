const moment = require('moment');

const Utils = {
  formatDateForPicker: (date) => {
    return moment(date).format("YYYY-MM-DD");
  },

  labTypeToName: (labType) => {
    const LAB_TYPE_TO_NAME = {
      cbp: 'Comprehensive Blood Panel',
      bmp: 'Basic Metabolic Panel'
    };
    return LAB_TYPE_TO_NAME[labType];
  },

  labTypesToCsv: (labTypes) => {
    return Array.from(labTypes)
      .map((lab) => lab.toUpperCase())
      .join(", ");
  },

  labTypesToObj: (labTypes) => {
    let obj = {};
    if (labTypes.has('cbp')) {
      obj['cbp'] = true;
    }
    if (labTypes.has('bmp')) {
      obj['bmp'] = true;
    }
    return obj;
  },

  getUniquePatientNames: (labs) => {
    const patientNames = new Set();
    labs.forEach(lab => (
      patientNames.add(lab.patient.firstName + ' ' + lab.patient.lastName)
    ));
    return Array.from(patientNames);
  },

  calculateReminderTimestamp: (args) => {
    let numDays;
    switch (args.alertPeriod) {
      case '7_DAYS':
      default:
        numDays = 7;
        break;
      case '14_DAYS':
        numDays = 14;
        break;
    }
    return moment(args.createTimestamp).add(numDays, 'days').toDate();
  },

  getAlertPeriod: (args) => {
    const numDays = moment(args.reminderTimestamp).diff(args.createTimestamp, 'days');
    switch (numDays) {
      case 7:
        return '7_DAYS';
      case 14: 
        return '14_DAYS';
      default:
        return null;
    }
  }
}

export default Utils;