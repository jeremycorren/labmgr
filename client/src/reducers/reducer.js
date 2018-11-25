import { combineReducers } from 'redux';

const labs = (state=[], action) => {
  switch (action.type) {
    case 'RECEIVE_LABS':
      const labs = action.labs;
      labs.forEach(lab => lab.labTypes = new Set(lab.labTypes));
      return [...labs];
    default:
      return state;
  }
}

const visibleLabs = (state=[], action) => {
  switch (action.type) {
    case 'RECEIVE_LABS':
      const fetchedLabs = action.labs;
      fetchedLabs.forEach(lab => lab.labTypes = new Set(lab.labTypes));
      return [...fetchedLabs];
    case 'FILTER_LABS':
      const labs = action.labs;
      const visibleLabs = labs.filter(lab => {
        const patientName = lab.patient.firstName + ' ' + lab.patient.lastName;

        const matchesName = patientName.includes(action.nameFilter);
        const matchesStatus = action.statusFilter !== '' ? lab.status === action.statusFilter : true;
        return matchesName && matchesStatus;
      });
      return [...visibleLabs];
    default:
      return state;
  }
}

const isFetchingLabs = (state=false, action) => {
  switch (action.type) {
    case 'FETCH_LABS':
      return true;
    case 'RECEIVE_LABS':
      return false;
    default:
      return state;
  }
}

const isSendingEmail = (state=false, action) => {
  switch (action.type) {
    case 'REMIND_LAB_START':
      return true;
    case 'REMIND_LAB_SUCCESS':
      return false;
    default:
      return state;
  }
}

const reducer = combineReducers({ 
  labs, 
  visibleLabs,
  isFetchingLabs,
  isSendingEmail 
});

export default reducer;