import  * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import { fetchUserVariables } from './variables_actions';
import { fetchUserCorrelations } from './correlations_actions';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

var flashTimer;

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const receiveUserLogout = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const clearErrors = (errors) => ({
  type: CLEAR_SESSION_ERRORS
})

// thunk creator
export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(receiveUserLogout());

  document.getElementById('hide-overflow-left') && document.getElementById('hide-overflow-left').classList.add('hidden');
  clearTimeout(flashTimer);
};

export const signup = user => dispatch => 
  APIUtil.signup(user).then(() => {
    dispatch(login({ email: user.email, password: user.password }));
  }, err => {
    dispatch(receiveErrors(err.response.data));
  });

export const login = user => dispatch => {
  APIUtil.login(user).then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
    dispatch(fetchUserVariables(decoded.id));
    dispatch(fetchUserCorrelations(decoded.id));

    setTimeout(() => {
      document.getElementById('tutorial-arrow').classList.add('flash');
      flashTimer = setTimeout(() => document.getElementById('tutorial-arrow').classList.remove('flash'), 15000)
      document.getElementById('hide-overflow-left').classList.remove('hidden');
    }, 1000)

  }).catch(err => {
    dispatch(receiveErrors(err.response.data));
  });
}

export const clearSessionErrors = () => dispatch => 
  dispatch(clearErrors())