import {combineReducers} from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import VariablesErrorsReducer from './variables_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  variables: VariablesErrorsReducer
});