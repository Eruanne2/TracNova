import * as APIUtil from '../util/variables_api_util';

export const RECEIVE_VARIABLE = 'RECEIVE_VARIABLE';
export const RECEIVE_USER_VARIABLES = 'RECEIVE_USER_VARIABLES';
export const REMOVE_VARIABLE = 'REMOVE_VARIABLE';
export const RECEIVE_VARIABLE_ERRORS = 'RECEIVE_VARIABLE_ERRORS';

export const receiveVariable = variable => ({
  type: RECEIVE_VARIABLE, 
  variable,
});

export const receiveUserVariables = userVariables => ({
  type: RECEIVE_USER_VARIABLES,
  userVariables,
});

export const removeVariable = varId => ({
  type: REMOVE_VARIABLE,
  varId,
});

export const receiveVariableErrors = errors => ({
  type: RECEIVE_VARIABLE_ERRORS,
  errors,
})

// thunk creators

export const fetchVariable = varId => dispatch => {
  return APIUtil.getVariableById(varId)
    .then(res => dispatch(receiveVariable(res.data)))
    .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};

export const fetchUserVariables = userId => dispatch => {
  return APIUtil.getUserVariables(userId)
    .then(res => dispatch(receiveUserVariables(res.data)))
    .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};

export const createVariable = varData => dispatch => {
  return APIUtil.postVariable(varData)
    .then(res => dispatch(receiveVariable(res.data)))
    .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};

export const addVariableEntry = entryData => dispatch => {
  return APIUtil.patchVariableEntry(entryData)
    .then(res => dispatch(receiveVariable(res.data)))
    .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};

export const updateVariable = varData => dispatch => {
  return APIUtil.patchVariable(varData)
  .then(res => {
    dispatch(receiveVariable(res.data));
  })
  .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};

export const destroyVariable = varId => dispatch => {
  return APIUtil.deleteVariable(varId)
    .then(res => {dispatch(removeVariable(res.data.v._id))})
    .catch(err => dispatch(receiveVariableErrors(err.response.data)));
};