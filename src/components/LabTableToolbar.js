import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import LabFormDialog from './LabFormDialog';

class LabTableToolbar extends Component {
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
    const { dispatch, rowsSelected, clearRowsSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames({ 
          [classes.highlight] : rowsSelected.length > 0
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
        <div style={{flex: '1 1 70%'}}></div>
          {rowsSelected.length === 1 ? (
            <div>
              <IconButton 
                aria-label='Edit'
                onClick={this.toggleDialog}
              >
                <EditIcon />
              </IconButton>
              <LabFormDialog 
                title='Edit record'
                open={this.state.open}
                toggleDialog={this.toggleDialog}
                clearRowsSelected={clearRowsSelected}
                labId={rowsSelected[0]}
              />
            </div>
            ) : (<div></div>)
          }
          {rowsSelected.length > 0 ? (

                <IconButton 
                  aria-label='Delete'
                  onClick={() => {
                    dispatch({
                      type: 'REMOVE_LABS',
                      idsToRemove: rowsSelected
                    });
                    clearRowsSelected();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
            ) : (<div></div>)
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

export default connect()(LabTableToolbar);