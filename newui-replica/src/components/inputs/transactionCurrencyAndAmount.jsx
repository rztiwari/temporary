import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

export default class TransactionCurrencyAndAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <FormGroup controlId="formControlsSelect" className="col-md-6">
        <div className="row combo-box">
          {this.props.children}
        </div>
        <FormControl.Feedback />
      </FormGroup>
    )
  }
}
