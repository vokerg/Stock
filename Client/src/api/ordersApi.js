export const getOrders = next =>
  fetch('/orders/orders/')
    .then(response => response.json())
    .then(orders => next(orders));
