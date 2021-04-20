import { RECEIVE_CORRELATION, RECEIVE_USER_CORRELATIONS, REMOVE_CORRELATION } from '../actions/correlations_actions';

const correlationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_CORRELATION:
      newState[action.correlation._id] = action.correlation;
      return newState;
    case RECEIVE_USER_CORRELATIONS:
      newState = {};
      action.userCorrelations.forEach(correlation => {
        newState[correlation._id] = correlation;
      });
      return newState;
    case REMOVE_CORRELATION:
      delete newState[action.correlationId];
      return newState;
    default:
      return state;
  }
}

export default correlationsReducer;