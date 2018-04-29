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
