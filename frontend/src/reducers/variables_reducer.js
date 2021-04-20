import { RECEIVE_VARIABLE, RECEIVE_USER_VARIABLES, REMOVE_VARIABLE } from '../actions/variables_actions';

const variablesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_VARIABLE:
      newState[action.variable._id] = action.variable;
      return newState;
    case RECEIVE_USER_VARIABLES:
      newState = {};
      action.userVariables.forEach(variable => {
        newState[variable._id] = variable;
      });
      return newState;
    case REMOVE_VARIABLE:
      delete newState[action.varId];
      return newState;
    default:
      return state;
  }
}

export default variablesReducer;