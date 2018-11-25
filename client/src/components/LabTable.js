import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import LabTableToolbar from './LabTableToolbar';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/styles';
import Utils from '../utils/utils';
import * as actions from '../actions/actions';

class LabTable extends Component {
  constructor(props) {
    super(props);
    this.moment = require('moment');
    this.state = {
      rowsSelected: []
    }
    this.clearRowsSelected = this.clearRowsSelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchLabs();
  }

  filterLabs(args) {
    this.props.filterLabs({
      labs: args.labs,
      statusFilter: args.statusFilter,
      nameFilter: args.nameFilter
    });
  }

  getSelectedRowIds() {
    let ids = [];
    for (let rowId in this.state.rowsSelected) {
      if (this.state.rowsSelected[rowId] === true) {
        ids.push(rowId);
      }
    }
    return ids;
  }

  clearRowsSelected() {
    this.setState({ rowsSelected: [] });
  }

  render() {
    const { labs, visibleLabs, isFetchingLabs, classes } = this.props;
    if (!isFetchingLabs && labs.length < 1) {
      return (
        <div style={{textAlign: 'center'}}>
          <Typography 
            variant='subtitle1'
            color='textSecondary'
          >
            There are no registered labs.
          </Typography>
        </div>
      );
    }
    if (isFetchingLabs) {
      return (
        <div style={{textAlign: 'center'}}>
          <Typography
            variant='h5'
            color='textSecondary'
          >
            Loading...
          </Typography>
        </div>
      );
    }
    return (
      <div style={styles.container}>
        <Paper>
          <LabTableToolbar 
            rowsSelected={this.getSelectedRowIds()} 
            clearRowsSelected={this.clearRowsSelected}
            filterLabs={this.filterLabs}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Labs</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Alert Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleLabs.map(lab => {
                return (
                  <TableRow key={lab._id}>
                    <TableCell>
                      <Checkbox 
                        checked={this.state.rowsSelected[lab._id] === true} 
                        onChange={event => {
                          const rowsSelected = this.state.rowsSelected;
                          rowsSelected[lab._id] = event.target.checked;
                          this.setState({ rowsSelected: rowsSelected });
                        }}
                      />
                    </TableCell>
                    <TableCell>{lab.patient.firstName + " " + lab.patient.lastName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={lab.status}
                        className={classNames({
                          [classes.colorPrimary]: lab.status === 'New',
                          [classes.colorSecondary]: lab.status === 'Reminded',
                          [classes.colorAction]: lab.status === 'Closed',
                          [classes.label]: true
                        })}
                      />
                    </TableCell>
                    <TableCell>{Utils.labTypesToCsv(lab.labTypes)}</TableCell>
                    <TableCell>{this.moment(lab.createTimestamp).format('MMMM Do YYYY')}</TableCell>
                    <TableCell>{this.moment(lab.reminderTimestamp).format('MMMM Do YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

LabTable = withStyles({ 
  colorPrimary: {
    backgroundColor: '#607d8b'
  },
  colorSecondary: {
    backgroundColor: '#00bcd4',
  },
  colorAction: {
    backgroundColor: '#4caf50'
  },
  label: {
    color: 'white'
  }
})(LabTable);

const mapStateToProps = (state) => { 
  return {
    labs: state.labs,
    visibleLabs: state.visibleLabs,
    isFetchingLabs: state.isFetchingLabs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLabs: () => dispatch(actions.fetchLabs()),
    filterLabs: (args) => dispatch(actions.filterLabs(args)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabTable);