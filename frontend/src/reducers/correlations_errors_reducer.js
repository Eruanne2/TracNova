import { RECEIVE_CORRELATION_ERRORS } from '../actions/correlations_actions';

const correlationsErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CORRELATION_ERRORS:
      return action.errors;
    default:
      return [];
  }
};

export default correlationsErrorsReducer;