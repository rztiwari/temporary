import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';

export default class AmountInTransaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onValueChange(e.target.value, this.props.elementId);
  }

  render() {
    return (
      <div className="col-xs-7 no-left-pad">
        <FormControl
          type="text"
          value={this.state.value}
          placeholder={this.props.properties.nlsLabel}
          onChange={this.handleChange}
          />
      </div>
    );
  }
}
