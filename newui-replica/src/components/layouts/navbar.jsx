import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

import logo from '../../images/logo.png';
import './navbar.css';

export default class MMNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMMSubHeader: false,
      navbarScrollModeCss: ''
    }
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollEvent);
  }

  handleScrollEvent() {
    if (window.pageYOffset > 60) {
      this.setState({navbarScrollModeCss: 'scroll-mode'});
    } else {
      this.setState({navbarScrollModeCss: ''});
    }
    if (window.pageYOffset > 82) {
      this.setState({showMMSubHeader: true})
    } else {
      this.setState({showMMSubHeader: false})
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className={"hsbc navbar-fixed-top " + this.state.navbarScrollModeCss}>
      <Navbar.Header>
      <Navbar.Brand>
      <a href="#"><img src={logo} alt="logo" /></a>
      </Navbar.Brand>
      { this.state.showMMSubHeader ? <Navbar.Brand> <span>{this.props.paymentMode}</span> </Navbar.Brand> : '' }
      <Navbar.Toggle />
      </Navbar.Header>
      </Navbar>);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScrollEvent);
    }
  }






  // <Navbar.Collapse>
  // <Nav pullRight>
  // <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
  // <MenuItem eventKey={3.1}><Link to="home">React MM</Link></MenuItem>
  // <MenuItem eventKey={3.2}><Link to="mm">Dojo MM</Link></MenuItem>
  // <MenuItem divider />
  // <MenuItem eventKey={3.3}>Logout</MenuItem>
  // </NavDropdown>
  // </Nav>
  // </Navbar.Collapse>
