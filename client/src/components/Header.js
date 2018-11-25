import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <AppBar 
    position='relative' 
    color='primary'
  >
    <Toolbar>
      <Typography variant='h6' color="inherit">
        Lab Manager
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;