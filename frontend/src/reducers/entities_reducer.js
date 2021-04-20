import {combineReducers} from 'redux';
import variablesReducer from './variables_reducer';
import correlationsReducer from './correlations_reducer';
// import SessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
  correlations: correlationsReducer,
  variables: variablesReducer
});