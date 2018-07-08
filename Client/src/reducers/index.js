import { combineReducers } from 'redux';

import userData, * as fromUserData from './userData';
import draftDocument, * as fromDraftDocument from './draftDocument';

export default combineReducers({userData, draftDocument});

export const getCurrentUser = state => fromUserData.getCurrentUser(state.userData);
export const getAuthorizationToken = state => fromUserData.getAuthorizationToken(state.userData);
export const getDraftNames = state => fromDraftDocument.getDraftNames(state.draftDocument);
