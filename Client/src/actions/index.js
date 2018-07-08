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

export const saveDraftDocument = (transfer, selectedStock, selectedStock2, selectedOperationType, orders) => ({
  type: 'SAVE_DRAFT',
  payload: {
    transfer,
    selectedStock,
    selectedStock2,
    selectedOperationType,
    orders
  }
});

export const clearDraft = draftId => ({
  type: 'CLEAR_DRAFT',
  payload: {draftId}
});
