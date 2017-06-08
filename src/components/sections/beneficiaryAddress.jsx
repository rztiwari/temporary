import React, {Component} from 'react';
import {ControlLabel} from 'react-bootstrap';

export default class BeneficiaryAddress extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <ControlLabel>*Beneficiary Address</ControlLabel>
        </div>
        <div className="col-md-8">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
  
}
