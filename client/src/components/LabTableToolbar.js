import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import LabFormDialog from './LabFormDialog';
import RemindLabDialog from './RemindLabDialog';
import RemoveLabDialog from './RemoveLabDialog';
import FilterLabsDialog from './FilterLabsDialog';
import TransitionLabDialog from './TransitionLabDialog';
import * as actions from '../actions/actions';

class LabTableToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      labFormDialogOpen: false,
      removeLabDialogOpen: false,
      remindLabDialogOpen: false,
      filterLabsDialogOpen: false,
      transitionLabDialogOpen: false
    }
    
    this.toggleFilterLabsDialog = this.toggleFilterLabsDialog.bind(this);
    this.toggleTransitionLabDialog = this.toggleTransitionLabDialog.bind(this);
    this.toggleRemindLabDialog = this.toggleRemindLabDialog.bind(this);
    this.toggleLabFormDialog = this.toggleLabFormDialog.bind(this);
    this.toggleRemoveLabDialog = this.toggleRemoveLabDialog.bind(this);
    this.removeLabs = this.removeLabs.bind(this);
  }

  toggleFilterLabsDialog() {
    this.setState(state => ({ filterLabsDialogOpen: !state.filterLabsDialogOpen }));
  }

  toggleTransitionLabDialog() {
    this.setState(state => ({ transitionLabDialogOpen: !state.transitionLabDialogOpen }));
  }

  toggleRemindLabDialog() {
    this.setState(state => ({ remindLabDialogOpen: !state.remindLabDialogOpen }));
  }

  toggleLabFormDialog() {
    this.setState(state => ({ labFormDialogOpen: !state.labFormDialogOpen }));
  }

  toggleRemoveLabDialog() {
    this.setState(state => ({ removeLabDialogOpen: !state.removeLabDialogOpen }));
  }

  removeLabs() {
    this.props.removeLabs({ labIds: this.props.rowsSelected });
    this.props.clearRowsSelected();
  }

  getSelectedLab() {
    const selectedLabId = this.props.rowsSelected[0];
    return this.props.labs.filter(lab => lab._id === selectedLabId)[0];
  }

  render() {
    const { filterLabs, rowsSelected, clearRowsSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames({ 
          [classes.highlight]: rowsSelected.length > 0
        })}
      >
        <Typography variant='subtitle1'>
          {(() => {
            if (rowsSelected.length < 1) {
              return 'Labs';
            }
            return `${rowsSelected.length} Selected`;
          })()}
        </Typography>
          {rowsSelected.length > 0 ? (
              <Tooltip title='Clear Selection'>
                <IconButton onClick={clearRowsSelected}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            ): <div></div>
          }
        <div style={{flex: '1 1 50%'}}></div>
          {
            rowsSelected.length === 1 
              && !['Closed', 'Reminded'].includes(this.getSelectedLab().status) ? (
                <div>
                  <Tooltip title='Remind'>
                    <IconButton onClick={this.toggleRemindLabDialog}>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                  <RemindLabDialog
                    open={this.state.remindLabDialogOpen}
                    toggleDialog={this.toggleRemindLabDialog}
                    remindLab={this.remindLab}
                    lab={this.getSelectedLab()}
                  />
                </div>
              ) : <div></div>
          }
          {rowsSelected.length === 1 && this.getSelectedLab().status !== 'Closed' ? (
            <div>
              <Tooltip title='Close'>
                <IconButton onClick={this.toggleTransitionLabDialog}>
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
              <TransitionLabDialog
                open={this.state.transitionLabDialogOpen}
                toggleDialog={this.toggleTransitionLabDialog}
                labId={rowsSelected[0]}
              />
              <Tooltip title='Edit'>
                <IconButton onClick={this.toggleLabFormDialog}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <LabFormDialog 
                title='Edit Record'
                open={this.state.labFormDialogOpen}
                toggleDialog={this.toggleLabFormDialog}
                clearRowsSelected={clearRowsSelected}
                labId={rowsSelected[0]}
              />
            </div>
            ) : (<div></div>)
          }
          {rowsSelected.length > 0 ? (
            <div>
              <Tooltip title='Delete'>
                <IconButton onClick={this.toggleRemoveLabDialog}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <RemoveLabDialog
                open={this.state.removeLabDialogOpen}
                toggleDialog={this.toggleRemoveLabDialog}
                removeLabs={this.removeLabs}
              />
            </div>
            ) : (
            <div>
              <Tooltip title='Filter'>
                <IconButton onClick={this.toggleFilterLabsDialog}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <FilterLabsDialog
                open={this.state.filterLabsDialogOpen}
                toggleDialog={this.toggleFilterLabsDialog}
                filterLabs={filterLabs}
              />
            </div>
            )
          }
      </Toolbar>
    );
  }
}

LabTableToolbar = withStyles({ 
  highlight: {
    backgroundColor: '#fae0ea'
  }
})(LabTableToolbar);

const mapStateToProps = (state) => { 
  return {
    labs: state.labs
  };
};

export default connect(
  mapStateToProps,
  actions
)(LabTableToolbar);