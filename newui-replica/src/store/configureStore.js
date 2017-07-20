import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';


export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
