import { getProducts } from '../api/productApi';

export const stateLogin = (authorization, user) => ({
  type: 'LOGIN',
  payload: {
    authorization,
    user
  }
});

export const stateLogout = () => ({
  type: 'LOGOUT'
});

export const saveDraftDocument = payload => ({
  type: 'SAVE_DRAFT',
  payload
});

export const clearDraft = draftId => ({
  type: 'CLEAR_DRAFT',
  payload: { draftId }
});

export const loadProducts = products => ({
  type: 'LOAD_PRODUCTS',
  payload: { products }
})

export const fetchProducts = () => dispatch =>
  getProducts(products => dispatch(loadProducts(products)));
