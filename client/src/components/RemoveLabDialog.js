import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';

const RemoveLabDialog = ({ open, toggleDialog, removeLabs }) => (
  <Dialog
    open={open}
    onClose={toggleDialog}
    aria-labelledby='form-dialog-title'
  >
    <DialogTitle style={{textAlign: 'center'}}>
      <WarningIcon color='error' /> <br />
      Delete Record(s)
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{textAlign: 'center'}}>
        Deletion should be used only when a record was created in error.
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
        color='secondary'
        onClick={removeLabs}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default RemoveLabDialog;