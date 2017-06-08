import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import InterTransfer from './index';
import RepairNote from '../banners/repairNote';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/paymentDetailsActions';
import paymentDetailsReducer from '../../reducers/paymentDetailsReducer';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Intertransfer component', () => {
  it(' renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InterTransfer />, div);
  });

  it('should create an action to load initial data', () => {
    const expectedAction = {
      type: types.LOAD_UI_SCHEMA,
      uischema: []
    }
    expect(actions.loadUiSchema().type).toEqual(expectedAction.type);
  });

  it('creates LOAD_UI_SCHEMA action when fetchUiSchema is dispatched', () => {
    fetchMock.get('*',{
      response: {
        view: []
      }
    });

    const store = mockStore({model: "", data: [], resources: {}, accountsList: []});
    const expectedActions = [{ type: 'LOAD_UI_SCHEMA', uischema: [] }];

    return store.dispatch(actions.fetchUiSchema())
    .then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  describe('RepairNote component', () => {
    it('renders correctly', () => {
      const repairnote = renderer.create(<RepairNote />).toJSON();
      expect(repairnote).toMatchSnapshot();
    });
  });

});
