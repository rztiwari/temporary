import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import AccountListDD from './accountListDropDown';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/paymentDetailsActions';
import paymentDetailsReducer from '../../reducers/paymentDetailsReducer';

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
  // describe('Account list Dropdown reducers', () => {
  //   it('should add account list data into state tree', () => {
  //
  //     const prevState = {model: "", data: [], resources: {}, accountsList: []};
  //     const expectedState = {model: "", data: [], resources: {}, accountsList: []}
  //     expect(paymentDetailsReducer())
  //   });
  // });
});
