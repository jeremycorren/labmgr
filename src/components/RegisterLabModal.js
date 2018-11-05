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

class RegisterLabModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      cbp: false,
      bmp: false,
      labTypes: new Set(),
      alertTime: ''
    }

    this.registerLab = this.registerLab.bind(this);
  }

  registerLab() {
    this.props.dispatch({
      type: 'ADD_LAB',
      patientName: this.state.patientName,
      labTypes: this.state.labTypes,
      alertTime: this.state.alertTime
    });

    this.props.toggleDialog();

    this.setState({
      patientName: '',
      cbp: false,
      bmp: false,
      labTypes: new Set(),
      alertTime: ''
    });
  }

  selectLabType(event, labType) {
    this.setState({ [labType]: event.target.checked }, () => {
      if (this.state[labType]) {
        this.setState({ labTypes: this.state.labTypes.add(labType) })
      } else {
        this.setState({ labTypes: this.state.labTypes.delete(labType) })
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
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
                value={this.state.alertTime}
                onChange={event => this.setState({ alertTime: event.target.value })}
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
                onClick={this.registerLab}
              >
                Register
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default connect()(RegisterLabModal);