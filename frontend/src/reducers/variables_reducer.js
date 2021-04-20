import * as variablesActions from '../actions/variables_actions';

const variablesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case variablesActions.RECEIVE_VARIABLE:
      newState[action.variable._id] = action.variable;
      return newState;
    case variablesActions.RECEIVE_USER_VARIABLES:
      newState = {};
      action.userVariables.forEach(variable => {
        newState[variable._id] = variable;
      });
      return newState;
    case variablesActions.REMOVE_VARIABLE:
      delete newState.id;
    default:
      return state;
  }
}

export default variablesReducer;