import React, {Component} from 'react';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountDojo: false,
      mountDojoRoute: false
    }
    this.toggelDojoMount = this.toggelDojoMount.bind(this);
    this.toggelDojoRouteMount = this.toggelDojoRouteMount.bind(this);
  }

  toggelDojoMount() {
    let mountDojo = this.state.mountDojo;
    mountDojo = !mountDojo;
    this.setState({mountDojo});
  }

  toggelDojoRouteMount() {
    let mountDojoRoute = this.state.mountDojoRoute
    mountDojoRoute = !mountDojoRoute;
    this.setState({mountDojoRoute});
  }

  render() {
    return(
      <div className="container new-ui">
      <div className="row center-align">
        <br></br><br></br><br></br>
        <h1>Move Money + New UI Integration POC</h1>
      </div>
      </div>
    );
  }
}
