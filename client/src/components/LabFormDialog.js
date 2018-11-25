import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Utils from '../utils/utils';
import * as actions from '../actions/actions';

class LabFormDialog extends Component {
  constructor(props) {
    super(props);

    const { labs, labId } = this.props;
    let obj;
  
    this.lab = null;
    if (labId) {
      this.lab = labs.filter(lab => lab._id === labId)[0];
      obj = Utils.labTypesToObj(this.lab.labTypes);
    }

    let alertPeriod;
    if (this.lab) {
      alertPeriod = Utils.getAlertPeriod({ 
        createTimestamp: this.lab.createTimestamp, 
        reminderTimestamp: this.lab.reminderTimestamp 
      });
    }

    this.state = {
      patientFirstName: this.lab ? this.lab.patient.firstName : '',
      patientLastName: this.lab ? this.lab.patient.lastName : '',
      patientBirthdate: this.lab ? Utils.formatDateForPicker(this.lab.patient.birthdate) : '',
      patientEmail: this.lab ? this.lab.patient.email : '',
      patientPhoneNumber: this.lab ? this.lab.patient.phoneNumber : '',
      cbp: this.lab ? obj.cbp : false,
      bmp: this.lab ? obj.bmp : false,
      labTypes: this.lab ? this.lab.labTypes : new Set(),
      alertPeriod: alertPeriod != null 
        ? alertPeriod
        : '7_DAYS'
    }

    this.addLab = this.addLab.bind(this);
    this.editLab = this.editLab.bind(this);
  }

  cannotSubmit() {
    return !this.state.patientFirstName
      && !this.state.patientLastName
      && !this.state.patientBirthdate
      && !this.state.patientEmail
      && !this.state.patientPhoneNumber;
  }

  addLab() {
    this.props.addLab({
      labTypes: this.state.labTypes,
      alertPeriod: this.state.alertPeriod,
      patientFirstName: this.state.patientFirstName,
      patientLastName: this.state.patientLastName,
      patientBirthdate: this.state.patientBirthdate,
      patientEmail: this.state.patientEmail,
      patientPhoneNumber: this.state.patientPhoneNumber
    });
    this.cleanupForm();
  }

  editLab() {
    this.props.editLab({
      labId: this.lab._id,
      createTimestamp: this.lab.createTimestamp,
      labTypes: this.state.labTypes,
      alertPeriod: this.state.alertPeriod,
      patientFirstName: this.state.patientFirstName,
      patientLastName: this.state.patientLastName,
      patientBirthdate: this.state.patientBirthdate,
      patientEmail: this.state.patientEmail,
      patientPhoneNumber: this.state.patientPhoneNumber
    });
    this.props.clearRowsSelected();
    this.cleanupForm();
  }

  cleanupForm() {
    this.props.toggleDialog();

    this.setState({
      patientFirstName: '',
      patientLastName: '',
      patientBirthdate: '',
      patientEmail: '',
      patientPhoneNumber: '',
      cbp: false,
      bmp: false,
      labTypes: new Set(),
      alertPeriod: ''
    });
  }

  selectLabType(event, labType) {
    this.setState({ [labType]: event.target.checked }, () => {
      if (this.state[labType]) {
        this.setState({ labTypes: this.state.labTypes.add(labType) });
      } else {
        this.state.labTypes.delete(labType);
        this.setState({ labTypes: this.state.labTypes });
      }
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggleDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{this.props.title}</DialogTitle>
        <DialogContent>
          <form style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
              label='First Name'
              value={this.state.patientFirstName}
              onChange={event => this.setState({ patientFirstName: event.target.value })}
              margin='dense'
            />
            <TextField
              label='Last Name'
              value={this.state.patientLastName}
              onChange={event => this.setState({ patientLastName: event.target.value })}
              margin='dense'
            />
            <TextField
              label='Birthdate'
              type='date'
              InputLabelProps={{ shrink: true }}
              value={this.state.patientBirthdate}
              onChange={event => this.setState({ patientBirthdate: event.target.value })}
              margin='dense'
            />
            <TextField
              label='Email'
              value={this.state.patientEmail}
              onChange={event => this.setState({ patientEmail: event.target.value })}
              margin='dense'
            />
            <TextField
              label='Phone Number'
              type='tel'
              value={this.state.patientPhoneNumber}
              onChange={event => this.setState({ patientPhoneNumber: event.target.value })}
              margin='dense'
            />
            <FormControl style={{display: 'flex', flexDirection: 'column', marginTop: 20}}>
              <FormLabel component='legend'>Labs</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.cbp}
                    onChange={event => this.selectLabType(event, 'cbp')}
                  />
                }
                label='Comprehensive Blood Panel'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.bmp}
                    onChange={event => this.selectLabType(event, 'bmp')}
                  />
                }
                label='Basic Metabolic Panel'
              />
            </FormControl>
            <FormControl>
              <InputLabel>Alert in</InputLabel>
              <Select
                native
                value={this.state.alertPeriod}
                onChange={event => this.setState({ alertPeriod: event.target.value })}
              >
                <option value={''}></option>
                <option value={'7_DAYS'}>1 week</option>
                <option value={'14_DAYS'}>2 weeks</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button 
            color='primary'
            onClick={this.props.toggleDialog}
          >
            Cancel
          </Button>
          <Button 
            disabled={this.cannotSubmit()}
            variant='contained'
            color='primary'
            onClick={this.lab ? this.editLab : this.addLab}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    labs: state.labs
  };
};

export default connect(
  mapStateToProps,
  actions
)(LabFormDialog);