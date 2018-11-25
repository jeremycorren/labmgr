import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions/actions';
import Utils from '../utils/utils';

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit }
});

class RemindLabDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentEmail: false
    }

    this.remindLab = this.remindLab.bind(this);
    this.toggleDialog = this.remindLab.bind(this);
  }

  remindLab() {
    this.setState({ sentEmail: true });
    this.props.remindLab(this.props.lab._id);
  }

  render() {
    const { lab, isSendingEmail, classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggleDialog}
        aria-labelledby='form-dialog-title'
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>
          Send Reminder
        </DialogTitle>
        <DialogContent>
          {
            !isSendingEmail && this.state.sentEmail ? (
              <div>
                <Typography variant='body1'>Your email was sent successfully.</Typography>
              </div>
              ) : (
              <div>
                <Typography variant='body1'><b>{lab.patient.firstName}</b> hasn't completed the following labwork:</Typography>
                <span style={{marginTop: 10, marginBottom: 10}}>
                  <ul>{Array.from(lab.labTypes).map(labType => (
                    <li key={labType}>
                      <Typography variant='body1'>{Utils.labTypeToName(labType)}</Typography>
                    </li>
                  ))}</ul>
                </span>
                <Typography variant='body1'>Would you like to send an email reminder to <b>{lab.patient.firstName}</b>?</Typography>
              </div>
            )
          }
          
        </DialogContent>
        <DialogActions>
        {
          !isSendingEmail && !this.state.sentEmail ? (
            <div>
              <Button
                variant='contained'
                color='primary'
                onClick={this.props.toggleDialog}
                className={classes.button}
              >
                Cancel
              </Button>
              <Button 
                variant='contained'
                color='primary'
                onClick={this.remindLab}
                className={classes.button}
              >
                Send
                <SendIcon className={classes.rightIcon} />
              </Button>
            </div>
          ) : isSendingEmail && this.state.sentEmail ? (
            <Button
              variant='contained'
              color='primary'
              disabled
              className={classes.button}
            >
              Sending...
            </Button>
          ) : !isSendingEmail && this.state.sentEmail ? (
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={() => {
                this.props.toggleDialog();
                this.setState({ sentEmail: false })
              }}
            >
              Done
            </Button>
          ) : <div></div>
        }
        </DialogActions>
      </Dialog>
    );
  }
}

RemindLabDialog = withStyles(styles)(RemindLabDialog);

const mapStateToProps = (state) => { 
  return {
    labs: state.labs,
    isSendingEmail: state.isSendingEmail
  };
};

export default connect(
  mapStateToProps,
  actions
)(RemindLabDialog);