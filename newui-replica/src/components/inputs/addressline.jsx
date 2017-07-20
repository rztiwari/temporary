import React, {Component} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

export default class AddressLine extends Component {

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
    }
    if(this.state.value.match(properties.format) === null) state = 'error';

    return state;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onValueChange(e.target.value, this.props.elementId);
  }

  render() {
    return (
      <div className="col-md-6">
        <FormGroup
          controlId="addressText"
          validationState={this.getValidationState()}
          >

          <FormControl
            type="text"
            value={this.state.value}
            placeholder={this.props.properties.nlsLabel}
            onChange={this.handleChange}
            />

          <FormControl.Feedback />

        </FormGroup>
      </div>
    );
  }
}
