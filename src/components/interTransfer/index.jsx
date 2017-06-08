import React, {Component} from 'react';
import MMNavSteps from '../layouts/nav-steps';
import MMFooter from '../layouts/footer';
import './inter-transfer.css';

export default class InterTransfer extends Component {
  render() {
    return(
      <div className="container priority-payment">
        <div className="row">
          <div className="col-md-12">
            <MMNavSteps />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <MMFooter />
          </div>
        </div>
      </div>
    );
  }
}
