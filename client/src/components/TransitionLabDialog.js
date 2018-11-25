import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import * as actions from '../actions/actions';

class TransitionLabDialog extends Component {
  constructor(props) {
    super(props);
    this.closeLab = this.closeLab.bind(this);
  }

  closeLab() {
    this.props.closeLab(this.props.labId);
  }

  render() {
    const { open, toggleDialog } = this.props;
    return (
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle>Close Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              <span>
                <b>Close</b> a record only once a patient has completed their labwork. <br/><br/>
                Once a record is <b>Closed</b>, you cannot send a <b>Reminder</b> about <br/> 
                the record or <b>Edit</b> it.
              </span>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={toggleDialog}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={this.closeLab}
          >
            Close
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
)(TransitionLabDialog);