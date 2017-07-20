import React, {Component} from 'react';

export default class BeneficiaryDetailsSection extends Component{
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <div className="payto">
            <p>Pay to</p>
          </div>
        </div>
        <div className="col-md-8 col-sm-8"></div>
        <div className="col-md-12">
          <div className="beneficiary-details-section">
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    );
  }
}
