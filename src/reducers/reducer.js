import { combineReducers } from 'redux';

const uuid = require('uuidv4');
const moment = require('moment');

const labs = (state=[], action) => {
  switch (action.type) {
    case 'ADD_LAB':
      const createTimestamp = moment();
      return [{
        id: uuid(),
        patientName: action.patientName,
        createTimestamp: createTimestamp.format('dddd, MMM Do YYYY'),
        labTypes: action.labTypes,
        alertDate: getAlertDate(createTimestamp, action.alertTime)
      }, ...state];
    case 'REMOVE_LABS':
      return state.filter(lab => !action.idsToRemove.includes(lab.id));
    default:
      return state;
  }
}

const getAlertDate = (createTimestamp, alertTime) => {
  let numDays;
  switch (alertTime) {
    case 'sevenDays':
    default:
      numDays = 7;
      break;
    case 'fourteenDays':
      numDays = 14;
      break;
  }
  return createTimestamp
    .add(numDays, 'days')
    .format('dddd, MMM Do YYYY');
};

const reducer = combineReducers({ labs });

export default reducer;