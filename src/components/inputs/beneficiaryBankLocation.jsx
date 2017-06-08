import React, {Component} from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import img1 from '../../images/USA.png';

export default class BeneficiaryBankLocation extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <ControlLabel>Beneficiary bank location</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <FormGroup controlId="formControlsSelect" className="col-md-6">
            <img alt="USA" src={img1} />&nbsp;
            <span>United States</span>
          </FormGroup>
        </div>
      </div>
    );
  }
}
