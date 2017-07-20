import React, {Component} from 'react';

export default class PaymentsHeader extends Component {
  constructor(props) {
    super(props);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollEvent);
  }

  handleScrollEvent() {
  }

  render() {
    return (
      <h2> {this.props.headerContent} </h2>
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollEvent);
  }
}
