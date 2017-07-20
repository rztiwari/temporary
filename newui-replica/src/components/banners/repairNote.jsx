import React, {Component} from 'react';
import './banners.css';

export default class RepairNote extends Component {

  render() {
      return (
        <div className="repair-note">
          <div className="row">
            <div className="col-md-1 col-sm-1">
              <i className="glyphicon glyphicon-exclamation-sign"></i>
            </div>
            <div className="col-md-11 col-sm-11">
              <h4><b>Warning</b></h4>
              <ol>
                <li><b>HSBC encourages customers to submit payments as early in the day as possible. This will allow for fraud monitoring checks  to be completed and any payment queries to be answered in order to achieve your requested value date.</b></li>
                <li><b>You may have additional debit accounts that are not listed here. If you cannot find the account you would like to pay from, please return to the payment and transfers tool to create your payment or template. (PBS001)</b></li>
              </ol>
            </div>
          </div>
        </div>
      );
  }
}