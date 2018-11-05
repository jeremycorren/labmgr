import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

let LabTableToolbar = ({ dispatch, rowsSelected, clearRowsSelected, classes }) => {
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
        {rowsSelected.length > 0 ? (
            <IconButton 
              aria-label="Delete"
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
  )
};

LabTableToolbar = withStyles({ 
  highlight: {
    backgroundColor: '#fae0ea'
  }
})(LabTableToolbar);

export default connect()(LabTableToolbar);