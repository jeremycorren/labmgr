import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Utils from '../utils/utils';
import Constants from '../utils/constants';

class FilterLabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: '',
      nameFilter: ''
    }

    this.filterLabs = this.filterLabs.bind(this);
  }

  filterLabs() {
    this.props.filterLabs({
      labs: this.props.labs,
      statusFilter: this.state.statusFilter,
      nameFilter: this.state.nameFilter
    });
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <form style={{display: 'flex', flexDirection: 'row', margin: 10}}>
          <FormControl style={{margin: 5}}> 
            <InputLabel htmlFor='status-select'>Status</InputLabel>
            <Select
              native
              value={this.state.statusFilter}
              onChange={event => this.setState({ 
                statusFilter: event.target.value 
              }, () => this.filterLabs())}
              inputProps={{
                name: 'status',
                id: 'status-select',
              }}
            >
              <option value='' />
              {
                [
                  Constants.Status.NEW, 
                  Constants.Status.REMINDABLE, 
                  Constants.Status.REMINDED,
                  Constants.Status.COMPLETE,
                  Constants.Status.INCOMPLETE
                ].map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))
              }
            </Select>
          </FormControl>
          <FormControl style={{margin: 5}}> 
            <InputLabel htmlFor='name-select'>Patient Name</InputLabel>
            <Select
              native
              value={this.state.nameFilter}
              onChange={event => this.setState({ 
                nameFilter: event.target.value 
              }, () => this.filterLabs())}
              inputProps={{
                name: 'name',
                id: 'name-select',
              }}
            >
              <option value='' />
              {
                Utils.getUniquePatientNames(this.props.labs).map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))
              }
            </Select>
          </FormControl>
        </form>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {
            this.state.statusFilter ? (
              <div style={{margin: 5}}>
                <Chip 
                  label={this.state.statusFilter}
                  onDelete={() => {
                    this.setState({
                      statusFilter: '',
                    }, () => this.filterLabs())
                  }}
                />
              </div>
            ) : <div></div>
          }
          {
            this.state.nameFilter ? (
              <div style={{margin: 5}}>
                <Chip 
                  label={this.state.nameFilter}
                  onDelete={() => {
                    this.setState({
                      nameFilter: '',
                    }, () => this.filterLabs())
                  }}
                />
              </div>
            ) : <div></div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    labs: state.labs
  };
};

export default connect(mapStateToProps)(FilterLabs);