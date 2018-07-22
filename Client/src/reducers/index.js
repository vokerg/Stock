import { combineReducers } from 'redux';

import userData, * as fromUserData from './userData';
import draftDocuments, * as fromDraftDocuments from './draftDocuments';
import products, * as fromProducts from './products';

export default combineReducers({userData, draftDocuments, products});

export const getCurrentUser = state => fromUserData.getCurrentUser(state.userData);
export const getCurrentUserId = state => fromUserData.getCurrentUserId(state.userData);
export const getAuthorizationToken = state => fromUserData.getAuthorizationToken(state.userData);
export const getDraftsList = state => fromDraftDocuments.getDraftsList(state.draftDocuments);
export const getDraft = (state, draftId) => fromDraftDocuments.getDraft(state.draftDocuments, draftId);
export const getProducts = state => fromProducts.getProducts(state.products);
export const getProduct = (state, id) => fromProducts.getProduct(state.products, id);
