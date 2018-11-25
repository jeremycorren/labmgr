import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LabFormDialog from './LabFormDialog';
import styles from '../styles/styles';

class RegisterLab extends Component {
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
      <div style={styles.container}>
        <Card>
          <CardContent>
            <Typography variant='h6' style={{textAlign: 'center'}}>
              Register lab(s) for a patient
            </Typography>
            <Typography color='textSecondary' style={{textAlign: 'center'}}>
              Record lab work and set corresponding alerts.
            </Typography>
            <LabFormDialog 
              title='Add Record'
              open={this.state.open}
              toggleDialog={this.toggleDialog}
            />
          </CardContent>
          <CardActions>
            <Button
              style={{margin: 'auto', marginBottom: 10}} 
              mini variant="fab" 
              color="primary"
              onClick={this.toggleDialog}
            >
              <AddIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );  
  }
}

export default RegisterLab;