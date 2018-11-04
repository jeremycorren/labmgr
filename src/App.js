import React, { Component } from 'react';
import configStore from './config/configStore';
import Root from './components/Root';

const store = configStore();

class App extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}

export default App;
