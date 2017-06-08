import React, { Component } from 'react';
import {Navbar, NavDropdown, MenuItem, Nav} from 'react-bootstrap';

export default class MMNavbar extends Component {
  render() {
    return (
   <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">HSBCnet</a>
      </Navbar.Brand>
      <Navbar.Brand>
        <span>{this.props.paymentMode}</span>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Profile</MenuItem>
          <MenuItem eventKey={3.2}>Settings</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
  }
}
