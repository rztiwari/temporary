import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import {fetchUiSchema} from './actions/paymentDetailsActions';

import routes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';


const store = configureStore();
store.dispatch(fetchUiSchema());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
