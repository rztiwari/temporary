import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import './navsteps.css';

export default class MMNavSteps extends Component {
  handleSelect() {
    alert("selected");
  }

  render () {
    return(
      <Nav
        bsStyle="pills"
        activeKey={1}
        onSelect={this.handleSelect}
        justified
        className="mm-nav-steps">

        <NavItem eventKey={1} disabled className="mm-nav-step">
          1. Transfer details
        </NavItem>

        <NavItem eventKey={2} disabled className="mm-nav-step">
          2. Verify
        </NavItem>

        <NavItem eventKey={3} disabled className="mm-nav-step">
          3. Confirmation
        </NavItem>

      </Nav>
    );
  }
}
