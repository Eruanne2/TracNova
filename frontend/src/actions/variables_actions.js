import * as APIUtil from '../util/variables_api_util';

export const RECEIVE_VARIABLE = 'RECEIVE_VARIABLE';
export const RECEIVE_USER_VARIABLES = 'RECEIVE_USER_VARIABLES';
export const REMOVE_VARIABLE = 'REMOVE_VARIABLE';

export const receiveVariable = variable => ({
  type: RECEIVE_VARIABLE, 
  variable,
});

export const receiveUserVariables = userVariables => ({
  type: RECEIVE_USER_VARIABLES,
  userVariables
});

export const removeVariable = varId => ({
  type: REMOVE_VARIABLE,
  varId
});

// thunk creators

export const fetchVariable = id => dispatch => {
  APIUtil.getVariableById(id)
    .then(res => dispatch(receiveVariable(res)));
};

export const fetchUserVariables = userId => dispatch => {
  APIUtil.getUserVariables(userId)
    .then(res => dispatch(receiveUserVariables(res)));
};

export const createVariable = varData => dispatch => {
  APIUtil.postVariable(varData)
    .then(res => dispatch(receiveVariable(res)));
};

export const updateVariable = varData => dispatch => {
  APIUtil.patchVariable(varData)
    .then(res => dispatch(receiveVariable(res)));
};

export const destroyVariable = id => dispatch => {
  APIUtil.deleteVariable(id)
    .then(res => dispatch(removeVariable(res)));
};