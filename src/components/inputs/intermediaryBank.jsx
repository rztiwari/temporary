import React, {Component} from 'react';
import {ControlLabel, FormGroup} from 'react-bootstrap';

export default class IntermediaryBank extends Component{
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <ControlLabel>Intermediary bank details</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <FormGroup className="col-md-6">
            <button className="btn btn-default mm-btn-default"><i className="glyphicon glyphicon-plus"></i> Add</button>
          </FormGroup>
        </div>
      </div>
    );
  }
}
