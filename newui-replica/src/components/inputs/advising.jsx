import React, { Component } from 'react'
import {ControlLabel, FormGroup} from 'react-bootstrap';

export default class Advising extends Component {
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
          <ControlLabel>Advising</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <FormGroup className="col-md-6">
            <button className="btn btn-default mm-btn-default"><i className="glyphicon glyphicon-export"></i> Add</button>
          </FormGroup>
        </div>
      </div>
    );
  }
}
