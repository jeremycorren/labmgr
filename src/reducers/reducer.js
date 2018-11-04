import { combineReducers } from 'redux';

const labs = (state=[], action) => {
  switch (action.type) {
    case 'ADD_LAB':
      const createTimestamp = new Date();
      return [{
        id: require('uuid')(),
        patientName: action.patientName,
        createTimestamp: createTimestamp,
        labTypes: action.labTypes,
        alertDate: getAlertDate(createTimestamp, action.alertTime)
      }, ...state];
    default:
      return state;
  }
}

const getAlertDate = alertTime => (
  alertTime
);

const reducer = combineReducers({ labs });

export default reducer;