import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Welcome from './welcome';


describe('Welcome component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Welcome />, div);
  });
});

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
