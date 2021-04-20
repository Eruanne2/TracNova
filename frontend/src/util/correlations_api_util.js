import axios from 'axios';

export const getCorrelationById = corrId => {
  return axios.get(`/api/correlations/${corrId}`);
};

export const getCorrelationsByUser = userId => {
  return axios.get(`/api/correlations/user/${userId}`);
};

export const postCorrelation = corrData => {
  return axios.post('/api/correlations/', corrData);
}

export const patchCorrelation = corrData => {
  return axios.patch(`/api/correlations/${corrData._id}`, corrData);
}

export const deleteCorrelation = corrId => {
  return axios.delete(`/api/correlations/${corrId}`);
}