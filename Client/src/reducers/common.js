import { combineReducers } from 'redux';

const redirectTo = (state=null, action) => {
  switch(action.type) {
    case 'DO_REDIRECT': return action.payload.redirectTo
    case 'REDIRECT': return null
    default: return state
  }
};

export const getRedirectTo = common => common.redirectTo;

export default combineReducers({ redirectTo });
