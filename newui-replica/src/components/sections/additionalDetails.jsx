import React, {Component} from 'react';
import './section.css';

export default class AdditionalDetails extends Component {
  render() {
    return (
      <div className="section">
        <div className="row">
          <div className="col-md-6">
            <header>Additional details</header>
          </div>
          <div className="col-md-6">
            <span className="pull-right"><small><b>* Required Information</b></small></span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    );
  }
}
