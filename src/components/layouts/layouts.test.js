import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import MMNavbar from './navbar';
import MMFooter from './footer';
import MMNavSteps from './nav-steps';

describe('Navbar component', () => {
  it('renders correctly', () => {
    const navbar = renderer.create(<MMNavbar paymentMode="Priority Payment" />).toJSON();
    expect(navbar).toMatchSnapshot();
  });
});

describe('Footer component', () => {
  it('renders correctly', () => {
    const footer = renderer.create(<MMFooter />).toJSON();
    expect(footer).toMatchSnapshot();
  });
});

describe('Navsteps component', () => {
  it('renders correctly', () => {
    const navsteps = renderer.create(<MMNavSteps />).toJSON();
    expect(navsteps).toMatchSnapshot();
  });
});
