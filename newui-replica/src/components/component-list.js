import Accounts from './sections/accounts';
import AddressLine from './inputs/addressline';
import BeneficiaryAddress from './sections/beneficiaryAddress';
import ChargesCode from './inputs/chargesCode';
import YourReference from './inputs/yourReference';
import TransferDetails from './sections/transferDetails';
import AdditionalDetails from './sections/additionalDetails';
import InfoForBeneficiary from './inputs/infoForBeneficiary';
import Advising from './inputs/advising';
import ValueDate from './sections/valueDate';
import PayImmediate from './inputs/payImmediate';
import PayOnDate from './inputs/payOnDate';
import PayRecurring from './inputs/payRecurring';
import TransactionAmount from './inputs/transactionAmount';
import TransactionAmountSelection from './inputs/transactionAmountSelection';
import PayInTransactionCurrency from './inputs/payInTransactionCurrency';
import TransactionCurrencyAndAmount from './inputs/transactionCurrencyAndAmount';
import TransactionCurrency from './inputs/transactionCurrency';
import AmountInTransactionCurrency from './inputs/amountInTransactionCurrency';
import RepairNote from './banners/repairNote';
import AccountListDropDownContainer from '../containers/accountListDropDownContainer';
import DebitAccountDetailsSection from './sections/debitAccountDetailsSection';
import BeneficiaryDetailsSection from './sections/beneficiaryDetailsSection';
import BankInstruction from './inputs/bankInstruction';
import InstructionCodes from './inputs/instructionCodes';
import IntermediaryBank from './inputs/intermediaryBank';
import RegulatoryReporting from './inputs/regulatoryReporting';
import BeneficiaryBankLocation from './inputs/beneficiaryBankLocation';
import ExistingBeneficiaryId from './inputs/existingBeneficiaryId';

const listOfAllComponents = {
  accounts: Accounts,
  beneficiaryAddress: BeneficiaryAddress,
  addressLine1: AddressLine,
  addressLine2: AddressLine,
  addressLine3: AddressLine,
  chargesCode: ChargesCode,
  primaryReference :YourReference,
  paymentSpecificsDetails: TransferDetails,
  additionalDetails: AdditionalDetails,
  infoForBeneficiary: InfoForBeneficiary,
  advising: Advising,
  valueDate: ValueDate,
  payImmediate: PayImmediate,
  payOnDate: PayOnDate,
  payRecurring: PayRecurring,
  transactionAmount: TransactionAmount,
  transactionAmountSelection: TransactionAmountSelection,
  payInTransactionCurrency: PayInTransactionCurrency,
  transactionCurrencyAndAmount: TransactionCurrencyAndAmount,
  transactionCurrency: TransactionCurrency,
  amountInTransactionCurrency: AmountInTransactionCurrency,
  repairNote: RepairNote,
  debitAccountList: AccountListDropDownContainer,
  debitAccountDetailsSection: DebitAccountDetailsSection,
  beneficiaryDetailsSection: BeneficiaryDetailsSection,
  bankInstruction: BankInstruction,
  instructionCodes: InstructionCodes,
  intermediaryBank: IntermediaryBank,
  regulatoryReporting: RegulatoryReporting,
  beneficiaryBankLocation: BeneficiaryBankLocation,
  existingBeneficiaryId: ExistingBeneficiaryId
};

export default listOfAllComponents;
