import {combineReducers} from 'redux';
import paymentDetails from './paymentDetailsReducer';


var rootReducer = combineReducers({
  paymentDetails
});

export default rootReducer;
