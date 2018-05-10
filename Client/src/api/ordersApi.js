import { authorization } from './token.js'

export const getOrders = next =>
  fetch(
    '/orders/orders/', {
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
