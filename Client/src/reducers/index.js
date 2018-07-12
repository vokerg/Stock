import { combineReducers } from 'redux';

import userData, * as fromUserData from './userData';
import draftDocuments, * as fromDraftDocuments from './draftDocuments';

export default combineReducers({userData, draftDocuments});

export const getCurrentUser = state => fromUserData.getCurrentUser(state.userData);
export const getAuthorizationToken = state => fromUserData.getAuthorizationToken(state.userData);
export const getDraftsList = state => fromDraftDocuments.getDraftsList(state.draftDocuments);
export const getDraft = (state, draftId) => fromDraftDocuments.getDraft(state.draftDocuments, draftId);
