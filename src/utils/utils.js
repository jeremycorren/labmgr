const moment = require('moment');

const Utils = {

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

  getAlertDate: (createTimestamp, alertPeriod) => {
    let numDays;
    switch (alertPeriod) {
      case 'sevenDays':
      default:
        numDays = 7;
        break;
      case 'fourteenDays':
        numDays = 14;
        break;
    }
    return moment(createTimestamp)
      .add(numDays, 'days')
      .format('dddd, MMM Do YYYY');
  },
}

export default Utils;