import React, { Component } from 'react';
import Header from './Header';
import RegisterLab from './RegisterLab';
import LabTable from './LabTable';

class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <RegisterLab />
        <LabTable />
      </div>
    );
  }
}

export default Main;