import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Accounts from './accounts';
import AdditionalDetails from './additionalDetails';
import BeneficiaryAddress from './beneficiaryAddress';
import BeneficiaryDetailsSection from './beneficiaryDetailsSection';
import DebitAccountDetailsSection from './debitAccountDetailsSection';
import TransferDetails from './transferDetails';
import ValueDate from './valueDate';

describe('Accounts component', () => {
  it('should render correctly', () => {
    const accounts = renderer.create(<Accounts />).toJSON();
    expect(accounts).toMatchSnapshot();
  });
});

describe('AdditionalDetails component', () => {
  it('should render correctly', () => {
    const additionalDetails = renderer.create(<AdditionalDetails />).toJSON();
    expect(additionalDetails).toMatchSnapshot();
  });
});

describe('BeneficiaryAddress component', () => {
  it('should render correctly', () => {
    const beneficiaryAddress = renderer.create(<BeneficiaryAddress />).toJSON();
    expect(beneficiaryAddress).toMatchSnapshot();
  });
});

describe('BeneficiaryDetailsSection component', () => {
  it('should render correctly', () => {
    const beneficiaryDetailsSection = renderer.create(<BeneficiaryDetailsSection />).toJSON();
    expect(beneficiaryDetailsSection).toMatchSnapshot();
  });
});

describe('DebitAccountDetailsSection component', () => {
  it('should render correctly', () => {
    const debitAccountDetailsSection = renderer.create(<DebitAccountDetailsSection />).toJSON();
    expect(debitAccountDetailsSection).toMatchSnapshot();
  });
});

describe('TransferDetails component', () => {
  it('should render correctly', () => {
    const transferDetails = renderer.create(<TransferDetails />).toJSON();
    expect(transferDetails).toMatchSnapshot();
  });
});

describe('ValueDate component', () => {
  it('should render correctly', () => {
    const valueDate = renderer.create(<ValueDate />).toJSON();
    expect(valueDate).toMatchSnapshot();
  });
});
