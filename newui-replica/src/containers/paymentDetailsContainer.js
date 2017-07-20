import {connect} from 'react-redux';
import PaymentDetails from '../components/interTransfer/paymentDetails';

const mapStateToProps = (state, ownProps) => {
  return {
    uischema: state.paymentDetails
  }
}

const PaymentDetailsContainer = connect(mapStateToProps)(PaymentDetails)

export default PaymentDetailsContainer
