import React, {Component} from 'react';
import {ControlLabel, FormGroup} from 'react-bootstrap';

export default class ValueDate extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <ControlLabel>Send this transfer</ControlLabel>
        </div>
        <div className="col-md-8 col-sm-8">
          <FormGroup className="col-md-12">
            {
              this.props.children
            }
          </FormGroup>
        </div>
        <div className="col-md-12 col-sm-12">
          <div className="well">
            <p><i className="glyphicon glyphicon-info-sign"></i> <b>Your transfer will be processed on the first possible value date</b></p>
          </div>
        </div>
      </div>
    );
  }
}
