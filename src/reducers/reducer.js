import { combineReducers } from 'redux';

const uuid = require('uuidv4');
const moment = require('moment');

const labs = (state=[], action) => {
  switch (action.type) {
    case 'ADD_LAB':
      return [{
        id: uuid(),
        patientName: action.patientName,
        createTimestamp: moment(),
        status: 'Pending',
        labTypes: action.labTypes,
        alertPeriod: action.alertPeriod
      }, ...state];
    case 'EDIT_LAB':
      const idxToEdit = state.findIndex(lab => lab.id === action.id);
      state[idxToEdit].patientName = action.patientName;
      state[idxToEdit].labTypes = action.labTypes;
      state[idxToEdit].alertPeriod = action.alertPeriod;
      return [...state];
    case 'REMOVE_LABS':
      return state.filter(lab => !action.idsToRemove.includes(lab.id));
    default:
      return state;
  }
}

const reducer = combineReducers({ labs });

export default reducer;