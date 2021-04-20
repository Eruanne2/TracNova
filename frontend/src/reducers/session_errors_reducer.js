import * as SessionActions from "../actions/session_actions";

const nullErrors = [];

export default function SessionErrorsReducer(state = nullErrors, action){
  Object.freeze(state);

  switch(action.type){
    case SessionActions.RECEIVE_SESSION_ERRORS: 
      return action.errors;
    case SessionActions.RECEIVE_CURRENT_USER:
      return nullErrors;
    default:
      return state;
  }
}