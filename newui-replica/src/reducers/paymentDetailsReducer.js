import * as types from '../actions/actionTypes';

export default function paymentDetailsReducer(state = {model: "", data: [], resources: {}, accountsList: []}, action) {
  switch(action.type) {
    case types.LOAD_UI_SCHEMA: {
      action.uischema.accountsList = [];
      return action.uischema
    }
    case types.LOAD_REST_UI_SCHEMA: {
      let newState = Object.assign({}, state);
      let newData = action.restUiSchema.data.splice(1);

      if(state.data.length > 2 ){
          newState.data = [state.data[0], state.data[1], ...newData];
      }else {
          newState.data = [...state.data, ...newData ];
      }
      newState.resources = action.restUiSchema.resources;

      if(state.data[0].children == null){
        newState.data[1].childElements.data[2].childElements = action.restUiSchema.data[0].childElements;
      }
      return newState;
    }
    case types.LOAD_ACCOUNTS_LIST: {
      let newState = Object.assign({}, state);
      newState.accountsList = action.accountsListData;
      return newState;
    }
    default:
      return state;
  }
}
