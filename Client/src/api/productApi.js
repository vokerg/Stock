import { authorization } from './token.js';

export const getProducts = next =>
  fetch('/stock/products/')
    .then(response => response.json())
    .then(products => next(products));

export const getProduct = id => next =>
  fetch(`/stock/products/${id}`, {headers:{...authorization()}})
    .then(response => response.json())
    .then(product => next(product));

export const getProductRests = id => next =>
  fetch(`/stock/products/${id}/productrest`, {headers:{...authorization()}})
    .then(response => response.json())
    .then(productRests => next(productRests));

export const insertProduct = product => next =>
  fetch('/stock/products/', {
      method: 'put',
      body: JSON.stringify(product),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...authorization()
      }
  })
  .then(product => next(product));

  export const updateProduct = product => next =>
    fetch(`/stock/products/${product.id}`, {
        method: 'post',
        body: JSON.stringify(product),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...authorization()
        }
    })
    .then(response => next(response));
