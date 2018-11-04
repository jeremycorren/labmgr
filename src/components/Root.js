import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { 
  MuiThemeProvider as ThemeProvider, 
  createMuiTheme as createTheme
} from '@material-ui/core/styles';
import Main from './Main';

const theme = createTheme({
  typography: {
    useNextVariants: true
  }
});

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </StoreProvider>
);

export default Root;