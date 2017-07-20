import React, { Component } from 'react';
import MMNavbar from './layouts/navbar';
import Subnav from './layouts/subnav';
import PaymentsHeader from './inputs/paymentsHeader';
import MMFooter from './layouts/footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'paymentMode': 'ACH Credits | Wages protection system'
    }
    this.handlePayementChange = this.handlePayementChange.bind(this);
  }

  handlePayementChange(paymentMode) {
    this.setState({paymentMode});
  }

  render() {
    return (
      <div className="App">
        <MMNavbar paymentMode={this.state.paymentMode} />
        <Subnav />
        <div className="container appheading">
          <PaymentsHeader headerContent={this.state.paymentMode} headerHandler={this.handlePayementChange} />
        </div>
        <div className="col-md-12 main-new-ui">
          {this.props.children}
        </div>
        <div className="col-md-12">
            <MMFooter />
        </div>
      </div>
    );
  }
}

export default App;
