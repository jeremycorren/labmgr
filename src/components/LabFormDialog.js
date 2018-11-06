import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Utils from '../utils/utils';

class LabFormDialog extends Component {
  constructor(props) {
    super(props);

    const { labs, labId } = this.props;
    let obj;
  
    this.lab = null;
    if (labId) {
      this.lab = labs.filter(lab => lab.id === labId)[0];
      obj = Utils.labTypesToObj(this.lab.labTypes);
    }

    this.state = {
      patientName: this.lab ? this.lab.patientName : '',
      cbp: this.lab ? obj.cbp : false,
      bmp: this.lab ? obj.bmp : false,
      labTypes: this.lab ? this.lab.labTypes : new Set(),
      alertPeriod: this.lab ? this.lab.alertPeriod : 'sevenDays'
    }

    this.addLab = this.addLab.bind(this);
    this.editLab = this.editLab.bind(this);
  }

  addLab() {
    this.props.dispatch({
      type: 'ADD_LAB',
      patientName: this.state.patientName,
      labTypes: this.state.labTypes,
      alertPeriod: this.state.alertPeriod
    });
    this.cleanupForm();
  }

  editLab() {
    this.props.dispatch({
      type: 'EDIT_LAB',
      id: this.lab.id,
      patientName: this.state.patientName,
      labTypes: this.state.labTypes,
      alertPeriod: this.state.alertPeriod
    });
    this.props.clearRowsSelected();
    this.cleanupForm();
  }

  cleanupForm() {
    this.props.toggleDialog();

    this.setState({
      patientName: '',
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <form style={{display: 'flex', flexDirection: 'column'}}>
            <TextField //TODO: autocomplete based on existing patients; register patients separately.
              label='Patient Name'
              value={this.state.patientName}
              onChange={event => this.setState({ patientName: event.target.value })}
              margin='normal'
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
                <option value={'sevenDays'}>1 week</option>
                <option value={'fourteenDays'}>2 weeks</option>
              </Select>
            </FormControl>
            <FormControl style={{display: 'block', marginTop: 20}}>
              <Button 
                variant='contained'
                color='primary'
                onClick={this.lab ? this.editLab : this.addLab}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    labs: state.labs
  };
};

export default connect(mapStateToProps)(LabFormDialog);