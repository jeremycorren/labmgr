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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import LabTableToolbar from './LabTableToolbar';
import { withStyles } from '@material-ui/core/styles';
import Utils from '../utils/utils';
import Constants from '../utils/constants';
import * as actions from '../actions/actions';

class LabTable extends Component {
  constructor(props) {
    super(props);
    this.moment = require('moment');
    this.state = {
      rowsSelected: [],
      rowsPerPage: 5,
      page: 0
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
      <div style={{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 20
      }}>
        <Paper>
          <LabTableToolbar 
            rowsSelected={this.getSelectedRowIds()} 
            clearRowsSelected={this.clearRowsSelected}
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
              {visibleLabs.slice(
                  this.state.page * this.state.rowsPerPage, 
                  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
              ).map(lab => {
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
                          [classes.colorNew]: lab.status === Constants.Status.NEW,
                          [classes.colorReminded]: lab.status === Constants.Status.REMINDED,
                          [classes.colorClosed]: lab.status === Constants.Status.COMPLETE,
                          [classes.colorRemindable]: lab.status === Constants.Status.REMINDABLE,
                          [classes.colorIncomplete]: lab.status === Constants.Status.INCOMPLETE,
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  rowsPerPage={this.state.rowsPerPage}
                  count={visibleLabs.length}
                  page={this.state.page}
                  onChangePage={(event, page) => this.setState({ page: page })}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    );
  }
}

LabTable = withStyles({ 
  colorNew: {
    backgroundColor: '#607d8b'
  },
  colorRemindable: {
    backgroundColor: '#9C27B0'
  },
  colorReminded: {
    backgroundColor: '#00bcd4',
  },
  colorClosed: {
    backgroundColor: '#4caf50'
  },
  colorIncomplete: {
    backgroundColor: '#757575'
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