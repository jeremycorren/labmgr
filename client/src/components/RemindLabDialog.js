import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import LabelOffIcon from '@material-ui/icons/LabelOff';
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
    this.incompleteLab = this.incompleteLab.bind(this);
  }

  remindLab() {
    this.setState({ sentEmail: true });
    this.props.remindLab(this.props.lab._id);
  }

  incompleteLab() {
    this.props.incompleteLab(this.props.lab._id);
    this.props.toggleDialog();
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
                <Typography variant='body1' style={{marginBottom: 20}}>
                  Click <b>Send</b> to send an email reminder to {lab.patient.firstName}. <br/><br/>
                  {
                    lab.reminderCount >= 2 ? (
                      <span>
                        <em>Note:</em> You have already reminded {lab.patient.firstName} <b>{lab.reminderCount}</b> time(s). <br/><br/>
                        Mark <b>Incomplete</b> if you would like to stop <br/> tracking this lab for reminders. <br/>
                      </span>
                    ) : <span></span>
                  }
                </Typography>
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
                Exit
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
              {
                lab.reminderCount >= 2 ? (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={this.incompleteLab}
                    className={classes.button}
                  >
                  Incomplete
                  <LabelOffIcon className={classes.rightIcon} />
                  </Button>
                ) : <span></span>
              }
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