import React, {Component} from 'react';
import {Radio} from 'react-bootstrap';

export default class PayRecurring extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
        <Radio name="radioGroup" inline className="col-md-3 col-sm-6">
          At regular intervals
        </Radio>
    );
  }
}
