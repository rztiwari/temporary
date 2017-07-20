import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';
import img1 from '../../images/MEXICO.png';
import img2 from '../../images/INDIA.png';
import img3 from '../../images/MALASIA.png';

import './inputs.css';

export default class AccountListDD extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionsData: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.onAccountListDropDownMount();
  }

  onChange(e, data) {
    const {value: accountId} = data;
    this.props.onAccountSelect(accountId);
  }

  render() {
    let options = this.props.optionsData.map( (d, index) => {
      const cc = {
        "MX": "MEXICO",
        "IN": "INDIA",
        "MY": "MALASIA",
        "SG": "SINGAPORE"
      };

      const ic = {
        "MX": img1,
        "IN": img2,
        "MY": img3
      };

      const selectedOptionElement = (
        <div className="mmOption">
          <div className="row">
            <div className="col-md-6">
              <div><span><img alt={cc[d.countryCode]} className="flag-img" src={ ic[d.countryCode] } /></span>
              <span><b>{ cc[d.countryCode] }</b></span>&nbsp;
                <span><b>{d.institutionCode}</b></span>
              </div>
              <h5><i className="glyphicon glyphicon-star"></i> <b>{d.accountName}</b> </h5>
              <small>{d.accountNumber}</small>
            </div>
            <div className="col-md-6 right-align">
              <small>Current available balance</small>
              <h5><b>USD 10,688,003,441.55</b></h5>
              <small>15:57 05 May 2017</small>
            </div>
          </div>
        </div>
      );

      const optEle= (<div>
        <h5> {d.accountName} </h5>
        <small>{d.currencyCode} {d.accountNumber}</small>
      </div>);

      return {
        key: index,
        text: selectedOptionElement,
        value: index,
        content: optEle
      }
    });

    return (
      <div className="row account-details">
        <div className="col-md-4">
          <div className="payfrom">
            <p>*Pay from</p>
            <i className="glyphicon glyphicon-arrow-down"></i>
          </div>
        </div>
        <div className="col-md-6">
          <Dropdown
            selection
            search
            fluid
            options={options}
            placeholder='Choose an option'
            onChange={this.onChange}
            />
        </div>
        <div className="col-md-2">
          <span><i className="glyphicon glyphicon-search"></i> All accounts</span>
        </div>
      </div>
    )
  }
}
