import * as types from './actionTypes';
import MMApi from '../middleware/MMApi';

// action creator for going to verify section
export function goToVerify(paymentInstruction) {
  return {type: types.GO_TO_VERIFY, data: paymentInstruction}
}

export function submitPaymentDetails() {
  return {type: types.SUBMIT_PAYMENT_DETAILS}
}

export function loadUiSchema(uischema) {
  return {type: types.LOAD_UI_SCHEMA, uischema}
}

export function loadRestUiSchema(restUiSchema) {
  console.log(restUiSchema);
  return {type: types.LOAD_REST_UI_SCHEMA , restUiSchema}
}

export function fetchRestUiSchema() {
  return (dispatch) => {
    return MMApi.getRestUiSchema()
                .then(uischema => { dispatch(loadRestUiSchema(uischema)) })
                .catch(error => { throw(error) });
  }
}

export function fetchUiSchema() {
  return (dispatch) => {
    return MMApi.getUiSchema()
                .then(uischema => { dispatch(loadUiSchema(uischema.response.view)) })
                .catch(error => { throw(error) });
  }
}

export function loadAccountsList(accountsListData) {
  return {
    type: types.LOAD_ACCOUNTS_LIST,
    accountsListData
  }
}

export function fetchAccountsList() {
  return (dispatch) => {
      return MMApi.getAccountsListData()
                  .then(accountsListData => { return dispatch(loadAccountsList(accountsListData.response.accounts.data)) })
                  .catch(error => {throw(error)});
  }
}
