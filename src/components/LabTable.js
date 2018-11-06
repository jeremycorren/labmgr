import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import LabTableToolbar from './LabTableToolbar';
import styles from '../styles/styles';
import Utils from '../utils/utils';

class LabTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsSelected: []
    }
    this.clearRowsSelected = this.clearRowsSelected.bind(this);
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
    const { labs } = this.props;
    if (labs.length < 1) {
      return <div></div>
    }
    return (
      <div style={styles.container}>
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
                <TableCell>Create Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Labs</TableCell>
                <TableCell>Alert Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labs.map(lab => {
                return (
                  <TableRow key={lab.id}>
                    <TableCell>
                      <Checkbox 
                        checked={this.state.rowsSelected[lab.id] === true} 
                        onChange={event => {
                          const rowsSelected = this.state.rowsSelected;
                          rowsSelected[lab.id] = event.target.checked;
                          this.setState({ rowsSelected: rowsSelected });
                        }}
                      />
                    </TableCell>
                    <TableCell>{lab.patientName}</TableCell>
                    <TableCell>{lab.createTimestamp.format('dddd, MMM Do YYYY')}</TableCell>
                    <TableCell>{lab.status}</TableCell>
                    <TableCell>{Utils.labTypesToCsv(lab.labTypes)}</TableCell>
                    <TableCell>{Utils.getAlertDate(lab.createTimestamp, lab.alertPeriod)}</TableCell>
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

const mapStateToProps = (state) => { 
  return {
    labs: state.labs
  };
};

export default connect(mapStateToProps)(LabTable);