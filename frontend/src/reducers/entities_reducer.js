import {combineReducers} from 'redux';
// import SessionErrorsReducer from './session_errors_reducer';

const correlationsReducer = (state = {}, action) => {
  return state;
}

const dataReducer = (state = {}, action) => {
  return state;
}

export default combineReducers({
  correlations: correlationsReducer,
  data: dataReducer
});