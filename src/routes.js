import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import InterTransfer from './components/interTransfer';
import Welcome from './components/welcome';
import PaymentDetailsContainer from './containers/paymentDetailsContainer';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome}/>
    <Route path="/home" component={InterTransfer}>
      <IndexRoute component={PaymentDetailsContainer}/>
    </Route>
  </Route>
);

export default routes;
