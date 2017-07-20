import React, {Component} from 'react';
import CompList from '../../component-list';
import './payment-details.css';

export default class PaymentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, id) {
    this.setState({[id]: value});
    console.log(this.state);
  }

  renderSections(elementData) {
    return elementData.map( ele => {
      if (ele.childElements){
        let El = CompList[ele.elementId];
        return (
          <El key={ele.elementId} onValueChange={this.handleChange} elementId={ele.elementId} properties={ele.properties} resources={this.props.uischema.resources[ele.elementId]}>
            {this.renderSections(ele.childElements.data)}
          </El>
        );
      } else {
        let El = CompList[ele.elementId];
        return <El key={ele.elementId} onValueChange={this.handleChange} elementId={ele.elementId} properties={ele.properties} resources={this.props.uischema.resources[ele.elementId]} />;
      }
    });
  }

  render() {
    return (
      <div className="payment-details">
        <form>
          {this.props.uischema.data.length !== 0 ? this.renderSections(this.props.uischema.data) : 'Rendering UI'}
          <button className="btn btn-default mm-btn-default">Close</button>
          <button className="btn btn-primary mm-btn-primary pull-right" type="submit">Continue</button>
        </form>
      </div>
    );
  }
}
