import React from 'react';
import ReactDOM from 'react-dom';
import PaymentDetails from './index';

it('PaymentDetails renders without crashing', () => {
  const div = document.createElement('div');
  const uischema = {
    data: []
  };

  ReactDOM.render(<PaymentDetails uischema={uischema} />, div);
});
