export const getProducts = next =>
  fetch('/stock/products/')
    .then(response => response.json())
    .then(stocks => next(stocks));
