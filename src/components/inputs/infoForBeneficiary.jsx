import React, { Component } from 'react'
import {ControlLabel, FormGroup, FormControl} from 'react-bootstrap';

export default class InfoForBeneficiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    let state = 'error';
    const properties = this.props.properties;

    if(this.state.value === '') return ;

    if(properties.mandatory) {
      const length = this.state.value.length;
      if (length > properties.min && length < properties.max) state = 'success';
    }else {
      state = 'success';
    }

    return state;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <ControlLabel>Information for the beneficiary</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <div className="col-md-6">
            <FormGroup
              controlId="addressText"
              validationState={this.getValidationState()}
              >
              <FormControl
                componentClass="text"
                value={this.state.value}
                onChange={this.handleChange}
                />
              <FormControl.Feedback />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}
