import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Welcome extends Component {
  render() {
    return(
      <div className="center-align">
        <h1>Welcome to Move Money POC</h1>
        <Link to="home" className="btn btn-primary">Start</Link>
      </div>
    );
  }
}
