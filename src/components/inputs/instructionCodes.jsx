import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class InstructionCodes extends Component {

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
          <ControlLabel>Instruction code</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <FormGroup controlId="formControlsSelect" className="col-md-6">
            <FormControl componentClass="select" onChange={this.handleChange}>
              {
                this.props.resources ? this.props.resources.options.map( opt => {
                  return <option key={opt} value={opt}>{opt}</option>
                }) : ''
              }
            </FormControl>
          </FormGroup>
        </div>
      </div>
    );
  }
}
