import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import './inputs.css';

export default class TransactionCurrency extends Component {

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
      <div className="col-xs-5 no-right-pad">
        <FormControl componentClass="select" onChange={this.handleChange}>
          {
            this.props.resources.options.map( opt => {
              return <option key={opt} value={opt}>{opt}</option>
            })
          }
        </FormControl>
      </div>
    );
  }
}
