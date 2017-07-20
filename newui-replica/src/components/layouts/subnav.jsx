import React, {Component} from 'react';
import {Navbar, NavDropdown, MenuItem, Nav, NavItem} from 'react-bootstrap';

export default class Subnav extends Component {
  render() {
    return(
      <Navbar inverse collapseOnSelect className="hsbc navbar navbar-inverse new-ui-sub-nav">
      <Navbar.Collapse>
      <Nav>
       <NavItem eventKey={1} href="#/">Accounts</NavItem>
      <NavDropdown eventKey={3} title="Payments & transfers" id="basic-nav-dropdown" className="active">
      <MenuItem eventKey={3.1} href="#/mm">Move Money</MenuItem>
      <MenuItem eventKey={3.2} href="#/home">React Version MM</MenuItem>
      </NavDropdown>
      <NavItem eventKey={1} href="#">Trade services</NavItem>
      <NavItem eventKey={1} href="#">User & accounts management</NavItem>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}
