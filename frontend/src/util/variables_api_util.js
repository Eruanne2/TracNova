import axios from 'axios';

export const getVariableById = varId => {
  return axios.get(`/api/variables/${varId}`);
};

export const getUserVariables = userId => {
  return axios.get(`/api/variables/user/${userId}`)
};

export const postVariable = varData => {
  return axios.post('/api/variables/', varData);
};

export const patchVariableEntry = varData => {
  return axios.patch(`/api/variables/${varData.id}/entry`, varData);
};

export const deleteVariable = varId => {
  return axios.delete(`/api/variables/${varId}`);
};