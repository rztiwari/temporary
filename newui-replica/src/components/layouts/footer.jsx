import React, {Component} from 'react';
import './footer.css';

export default class MMFooter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="mm-footer-end">
            <span className="fsection">Terms and Conditions of Use</span>
            <span className="fsection">Privacy and Data Protection statement</span>
            <span className="fsection">HSBCnet condition of national language use</span>
            <br></br><br></br>
            <p><small>No endorsement or approval of any third parties or their adivce, opinions, information, products or services is expressed or implied by any  information on this site or by nay hyperlinks to or from any third party websites or pages. Your use of this website is subject to the terms and conditions governing it. Please read these terms  and conditions before using the website.</small></p>
          </div>
        </div>
      </div>
    )
  }
}


// <div className="col-md-12 no-left-pad no-right-pad">
//   <div className="mm-footer-main">
//     <span className="fsection"><i className="glyphicon glyphicon-lock"></i> Online Security</span>
//     <span className="v-divider">&nbsp;</span>
//     <span className="fsection"><i className="glyphicon glyphicon-globe"></i> HSBC Group</span>
//     <span className="fsection pull-right"><i className="glyphicon glyphicon-earphone"></i> Customer Support</span>
//   </div>
// </div>
