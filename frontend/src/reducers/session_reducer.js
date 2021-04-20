import * as SessionActions from '../actions/session_actions';

const nullUser = {
  isAuthenticated: false,
  user: undefined
};

export default function SessionReducer(state = nullUser, action){
  Object.freeze(state);
  switch (action.type){
    case SessionActions.RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case SessionActions.RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}