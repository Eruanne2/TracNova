import {combineReducers} from 'redux';
import variablesReducer from './variables_reducer';
import correlationsReducer from './correlations_reducer';

export default combineReducers({
  variables: variablesReducer,
  correlations: correlationsReducer,
});