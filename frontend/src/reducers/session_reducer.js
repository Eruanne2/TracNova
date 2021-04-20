import * as SessionActions from '../actions/session_actions';

const nullUser = {
  isAuthenticated: false,
  user: undefined
};

export default function SessionReducer(state = nullUser, action){
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
    case SessionActions.RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      };
    default:
      return state;
  }
}