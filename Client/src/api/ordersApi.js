import { authorization } from './token.js'

const getOrders = params => next =>
  fetch(
    `/orders/orders${params}`, {
      headers: {...authorization()}
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw Error(response.statusText);
  })
  .then(orders => next(orders));


export const getOrdersForStock = stockId => next => getOrders(`?stockId=${stockId}`)(next);
export const getOrdersForDoc = documentId => next => getOrders(`?documentId=${documentId}`)(next);
export const getAllOrders = next => getOrders('/')(next);

export const getOperationTypes = next =>
  fetch('/orders/operationTypes/', {headers:{...authorization()}})
    .then(response =>{
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then(types => next(types));

export const insertOrder = order => next =>
  fetch('/orders/orders/', {
      method: 'put',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...authorization()
      }
  })
  .then(response => next(response));

  export const getDocs = next =>
    fetch(
      '/orders/docs/', {
        headers: {...authorization()}
      }
    )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then(docs => next(docs));
