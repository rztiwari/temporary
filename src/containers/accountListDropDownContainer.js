import {connect} from 'react-redux';
import AccountListDropDown from '../components/inputs/accountListDropDown';
import {fetchRestUiSchema, fetchAccountsList} from '../actions/paymentDetailsActions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAccountSelect: () => {
      dispatch(fetchRestUiSchema())
    },
    onAccountListDropDownMount: () => {
      dispatch(fetchAccountsList())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    optionsData: state.paymentDetails.accountsList
  }
}

const AccountListDropDownContainer = connect(mapStateToProps, mapDispatchToProps)(AccountListDropDown)

export default AccountListDropDownContainer
