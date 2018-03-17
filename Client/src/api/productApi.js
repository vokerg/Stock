export const getProducts = next =>
  fetch('/products/')
    .then(response => response.json())
    .then(stocks => next(stocks));
