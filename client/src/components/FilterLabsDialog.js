import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FilterLabsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: '',
      nameFilter: ''
    }

    this.filterLabs = this.filterLabs.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  filterLabs() {
    this.props.filterLabs({
      labs: this.props.labs,
      statusFilter: this.state.statusFilter,
      nameFilter: this.state.nameFilter
    });
    this.props.toggleDialog();
  }

  clearFilters() {
    this.setState({
      statusFilter: '',
      nameFilter: ''
    }, () => this.filterLabs());
  }

  render() {
    const { open, toggleDialog } = this.props;
    return (
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle>
          Filters
        </DialogTitle>
        <DialogContent>
          <form style={{display: 'flex', flexDirection: 'column'}}>
            <FormControl style={{marginBottom: 5}}> 
              <InputLabel htmlFor='status-select'>Status</InputLabel>
              <Select
                native
                value={this.state.statusFilter}
                onChange={event => this.setState({ statusFilter: event.target.value })}
                inputProps={{
                  name: 'status',
                  id: 'status-select',
                }}
              >
                <option value='' />
                <option value={'New'}>New</option>
                <option value={'Reminded'}>Reminded</option>
                <option value={'Closed'}>Closed</option>
              </Select>
            </FormControl>
            <TextField
              label='Patient Name'
              value={this.state.nameFilter}
              onChange={event => this.setState({ nameFilter: event.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button 
            color='primary'
            onClick={toggleDialog}
          >
            Cancel
          </Button>
          <Button 
            disabled={!this.state.nameFilter && !this.state.statusFilter}
            color='primary'
            onClick={this.clearFilters}
          >
            Clear
          </Button>
          <Button 
            color='primary'
            onClick={this.filterLabs}
          >
            Filter
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

export default connect(mapStateToProps)(FilterLabsDialog);