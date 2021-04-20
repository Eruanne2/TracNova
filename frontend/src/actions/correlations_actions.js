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
