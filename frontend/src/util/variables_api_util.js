import axios from 'axios';

export const getVariableById = varId => {
  return axios.get(`/variables/${varId}`);
};

export const getUserVariables = userId => {
  return axios.get(`/variables/user/${userId}`)
};

export const postVariable = varData => {
  return axios.post('/variables', varData);
};

export const patchVariable = varData => {
  return axios.patch(`/variables/${varData.id}`, varData);
};

export const deleteVariable = varId => {
  return axios.delete(`/variables/${varId}`);
};