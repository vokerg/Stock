import { combineReducers } from 'redux';

import userData, * as fromUserData from './userData';

export default combineReducers({userData});

export const getCurrentUser = state => fromUserData.getCurrentUser(state.userData);
export const getAuthorizationToken = state => fromUserData.getAuthorizationToken(state.userData);
