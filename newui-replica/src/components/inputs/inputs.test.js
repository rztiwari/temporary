import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AccountListDD from './accountListDropDown';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/paymentDetailsActions';
import paymentDetailsReducer from '../../reducers/paymentDetailsReducer';
import TransactionAmount from './transactionAmount';
import TransactionAmountSelection from './transactionAmountSelection';
import ChargesCode from './chargesCode';
import YourReference from './yourReference';
import InfoForBeneficiary from './infoForBeneficiary';
import InstructionCodes from './instructionCodes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Accounts List Dropdown Component', () => {

  describe('Account list Dropdown component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      const data = {
        optionsData: [],
        onAccountListDropDownMount: () => {},
        onAccountSelect: () => {}
      }
      ReactDOM.render(<AccountListDD {...data} />, div);
    });
  });

  describe('Account list Dropdown action creators', () => {
    it('should create an action to load account list data', ()=> {
      const expectedAction = {
        type: types.LOAD_ACCOUNTS_LIST,
        accountsListData: []
      }
      expect(actions.loadAccountsList().type).toEqual(expectedAction.type);
    });

    it('creates LOAD_ACCOUNTS_LIST action when fetching  Account list dropdown data is done', () => {
      fetchMock.get('*',{
        response: {
          accounts: {
            data: []
          }
        }
      });

      const store = mockStore({model: "", data: [], resources: {}, accountsList: []});
      const expectedActions = [{ type: 'LOAD_ACCOUNTS_LIST', accountsListData: [] }];

      return store.dispatch(actions.fetchAccountsList())
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedActions);
        }
      );
    });
  });
});


describe('TransactionAmount component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TransactionAmount />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});


describe('TransactionAmountSelection component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TransactionAmountSelection />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});


describe('ChargesCode component', () => {
  let chargesCodeCompo;
  const options= {
    "default": "SHAR",
    "options": [
      "CRED",
      "DEBT",
      "SHAR"
    ]
  }
  beforeEach(()=>{
    chargesCodeCompo = mount(<ChargesCode resources={options} />);
  });

  it('renders without crashing', () => {
    expect(chargesCodeCompo).toBeDefined();
  });

  it('should define props', () => {
    expect(chargesCodeCompo.props()).toBeDefined();
  });

  it('renders lable "*Charges"', () => {
    let ControlLabel = chargesCodeCompo.find('ControlLabel').first();
    expect(ControlLabel.text()).toEqual('*Charges');
  });

  it('renders change', () => {
    let formControlComp = chargesCodeCompo.find('FormControl').first();
    formControlComp.simulate('change', { target: { value: 'CRED' } });
    expect(chargesCodeCompo.state()).toEqual({value: 'CRED'});
    expect(chargesCodeCompo.state()).toBeDefined();
  });

  it('renders <options/>', () => {
    let arr = chargesCodeCompo.find('option');
    expect(arr.length).toEqual(3);
  });

  it('renders expected values', () => {
    let arr = chargesCodeCompo.find('option');
    const texts = arr.map(node => node.text());
    expect(texts).toEqual([ 'CRED', 'DEBT', 'SHAR' ]);
  });
});


describe('YourReference component', () => {
  let yourReferenceCompo;
  const properties = {
    "mandatory": false,
    "nlsLabel": "psLbl_CUSTOMER_REFERENCE_LABEL",
    "format": "^([a-zA-Z0-9-?:().,'+](?!.*/{2})[ a-zA-Z0-9-?/:().,'+]{0,14}[ a-zA-Z0-9-?:().,'+]|[a-zA-Z0-9-?:().,'+])$",
    "min": 0,
    "max": 16
  };

  beforeEach(()=>{
    yourReferenceCompo = mount(<YourReference properties={properties}/>);
  });

  it('renders without crashing', () => {
    expect(yourReferenceCompo).toBeDefined();
  });

  it('renders lable "*Your reference"', () => {
    let ControlLabel = yourReferenceCompo.find('ControlLabel').first();
    expect(ControlLabel.text()).toEqual('*Your reference');
  });

  it('should define props', () => {
    expect(yourReferenceCompo.props()).toBeDefined();
  });

  it('renders change', () => {
    let formControlComp = yourReferenceCompo.find('FormControl').first();
    formControlComp.simulate('change', { target: { value: 'CRED' } });
    expect(yourReferenceCompo.state()).toEqual({value: 'CRED'});
    expect(yourReferenceCompo.state()).toBeDefined();
  });
});


describe('InfoForBeneficiary component', () => {
  let infoForBeneficiaryCompo;
  const properties = {
    "mandatory": false,
    "nlsLabel": "psLbl_BENEFICIARY_INFO_HEADING",
    "expanded": true
  };

  beforeEach(()=>{
    infoForBeneficiaryCompo = mount(<InfoForBeneficiary properties={properties}/>);
  });

  it('renders without crashing', () => {
    expect(infoForBeneficiaryCompo).toBeDefined();
  });

  it('renders lable "Information for the beneficiary"', () => {
    let ControlLabel = infoForBeneficiaryCompo.find('ControlLabel').first();
    expect(ControlLabel.text()).toEqual('Information for the beneficiary');
  });

  it('should efine props', () => {
    expect(infoForBeneficiaryCompo.props()).toBeDefined();
  });

  it('renders change', () => {
    let formControlComp = infoForBeneficiaryCompo.find('FormControl').first();
    formControlComp.simulate('change', { target: { value: 'CRED' } });
    expect(infoForBeneficiaryCompo.state()).toEqual({value: 'CRED'});
    expect(infoForBeneficiaryCompo.state()).toBeDefined();
  });
});


describe('InstructionCodes component', () => {
  let instructionCodesCompo;
  beforeEach(()=>{
    instructionCodesCompo = mount(<InstructionCodes />);
  });

  it('renders without crashing', () => {
    expect(instructionCodesCompo).toBeDefined();
  });

  it('renders lable "Instruction code"', () => {
    let ControlLabel = instructionCodesCompo.find('ControlLabel').first();
    expect(ControlLabel.text()).toEqual('Instruction code');
  });

  it('renders change', () => {
    let formControlComp = instructionCodesCompo.find('FormControl').first();
    formControlComp.simulate('change', { target: { value: 'CRED' } });
    expect(instructionCodesCompo.state()).toEqual({value: 'CRED'});
    expect(instructionCodesCompo.state()).toBeDefined();
  });
});
