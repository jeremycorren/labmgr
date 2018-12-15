import Util from '../utils/utils';

export const fetchLabs = () => {
  const fn = (dispatch) => {
    dispatch({ type: 'FETCH_LABS' });
    fetch('/labs/findLabs', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(labs => {
        dispatch({
          type: 'RECEIVE_LABS',
          labs: labs
        });
      });
  };
  return fn;
};

export const filterLabs = (args) => ({
  type: 'FILTER_LABS',
  labs: args.labs,
  statusFilter: args.statusFilter,
  nameFilter: args.nameFilter
})

export const addLab = (input) => {
  const fn = (dispatch) => {
    dispatch({ type: 'ADD_LAB_START' });
    fetch('/labs/createLab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reminderTimestamp: Util.calculateReminderTimestamp({
          createTimestamp: input.createTimestamp,
          alertPeriod: input.alertPeriod
        }),
        labTypes: Array.from(input.labTypes),
        patientFirstName: input.patientFirstName,
        patientLastName: input.patientLastName,
        patientBirthdate: input.patientBirthdate,
        patientEmail: input.patientEmail,
        patientPhoneNumber: input.patientPhoneNumber
      })
    }).then(res => {
      if (res.status === 201) {
        dispatch({ type: 'ADD_LAB_SUCCESS' });
        dispatch(fetchLabs());
      }
    });
  }
  return fn;
};

export const editLab = (input) => {
  const fn = (dispatch) => {
    dispatch({ type: 'EDIT_LAB_START '});
    fetch('/labs/updateLab/' + input.labId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reminderTimestamp: Util.calculateReminderTimestamp({
          createTimestamp: input.createTimestamp,
          alertPeriod: input.alertPeriod
        }),
        labTypes: Array.from(input.labTypes),
        patientFirstName: input.patientFirstName,
        patientLastName: input.patientLastName,
        patientBirthdate: input.patientBirthdate,
        patientEmail: input.patientEmail,
        patientPhoneNumber: input.patientPhoneNumber
      })
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'EDIT_LAB_SUCCESS' });
        dispatch(fetchLabs());
      }
    });
  }
  return fn;
};

export const remindLab = (labId) => {
  const fn = (dispatch) => {
    dispatch({ type: 'REMIND_LAB_START' });
    fetch('/labs/remindLab/' + labId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'REMIND_LAB_SUCCESS' });
        dispatch(fetchLabs());
      }
    });
  };
  return fn;
}

export const closeLab = (labId) => {
  const fn = (dispatch) => {
    dispatch({ type: 'CLOSE_LAB_START' });
    fetch('/labs/closeLab/' + labId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'CLOSE_LAB_SUCCESS '});
        dispatch(fetchLabs());
      }
    });
  };
  return fn;
}

export const incompleteLab = (labId) => {
  const fn = (dispatch) => {
    dispatch({ type: 'INCOMPLETE_LAB_START' });
    fetch('/labs/incompleteLab/' + labId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'INCOMPLETE_LAB_SUCCESS '});
        dispatch(fetchLabs());
      }
    });
  }
  return fn;
}

export const removeLabs = (args) => {
  const fn = (dispatch) => {
    dispatch({ type: 'REMOVE_LABS_START '});
    fetch('/labs/deleteLabs/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ labIds: args.labIds })
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: 'REMOVE_LABS_SUCCESS' });
        dispatch(fetchLabs());
      }
    });
  };
  return fn;
}