import React, { Component } from 'react';
import MMNavbar from './layouts/navbar';

import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <MMNavbar paymentMode="Priority Payment" />
        {this.props.children}
      </div>
    );
  }
}

export default App;
