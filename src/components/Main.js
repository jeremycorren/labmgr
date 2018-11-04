import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RegisterLab from './RegisterLab';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState(state => ({
      open: !state.open
    }));
  }

  render() {
    return (
      <div>
        <Typography variant='subtitle1'>
          Register lab(s) for a patient.
        </Typography>
        <Button 
          mini variant="fab" 
          color="primary"
          onClick={this.toggleDialog}
        >
          <AddIcon />
        </Button>
        <RegisterLab 
          open={this.state.open}
          toggleDialog={this.toggleDialog}
        />
      </div>
    );
  }
}

export default Main;