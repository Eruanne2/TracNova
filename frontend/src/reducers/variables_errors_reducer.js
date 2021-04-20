import { RECEIVE_VARIABLE_ERRORS } from '../actions/variables_actions';

const variablesErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_VARIABLE_ERRORS:
      return action.errors;
    default:
      return [];
  }
}

export default variablesErrorsReducer;