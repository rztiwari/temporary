import React, {Component} from 'react';
import {ControlLabel} from 'react-bootstrap';

export default class TransactionAmount extends Component {

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
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <ControlLabel>*Amount</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}
