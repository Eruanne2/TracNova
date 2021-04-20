import * as APIUtil from '../util/correlations_api_util';

export const RECEIVE_CORRELATION = 'RECEIVE_CORRELATION';
export const RECEIVE_USER_CORRELATIONS = 'RECEIVE_USER_CORRELATIONS';
export const RECEIVE_CORRELATION_ERRORS = 'RECEIVE_CORRELATION_ERRORS';
export const REMOVE_CORRELATION = 'REMOVE_CORRELATION';

export const receiveCorrelation = correlation => ({
  type: RECEIVE_CORRELATION,
  correlation,
});

export const receiveUserCorrelations = userCorrelations => ({
  type: RECEIVE_USER_CORRELATIONS,
  userCorrelations,
});

export const receiveCorrelationErrors = errors => ({
  type: RECEIVE_CORRELATION_ERRORS,
  errors,
});

export const removeCorrelation = correlationId => ({
  type: REMOVE_CORRELATION,
  correlationId,
});

// thunk creators

export const fetchCorrelation = correlationId => dispatch => {
  APIUtil.getCorrelationById(correlationId)
    .then(res => dispatch(receiveCorrelation(res.data)))
    .catch(err => dispatch(receiveCorrelationErrors(err.response.data)));
};

export const fetchUserCorrelations = userId => dispatch => {
  APIUtil.getCorrelationsByUser(userId)
    .then(res => dispatch(receiveUserCorrelations(res.data)))
    .catch(err => dispatch(receiveCorrelationErrors(err.response.data)));
};

export const createCorrelation = correlationData => dispatch => {
  APIUtil.postCorrelation(correlationData)
    .then(res => dispatch(receiveCorrelation(res.data)))
    .catch(err => dispatch(receiveCorrelationErrors(err.response.data)));
};

export const updateCorrelation = correlationData => dispatch => {
  APIUtil.patchCorrelation(correlationData)
    .then(res => dispatch(receiveCorrelation(res.data)))
    .catch(err => dispatch(receiveCorrelationErrors(err.response.data)));
};

export const destroyCorrelation = correlationId => dispatch => {
  APIUtil.deleteCorrelation(correlationId)
    .then(res => dispatch(removeCorrelation(res.data._id)))
    .catch(err => dispatch(receiveCorrelationErrors(err.response.data)));
};