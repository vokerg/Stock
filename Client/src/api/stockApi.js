import { authorization } from './token.js';

export const getStocks = next =>
  fetch('/stock/stocks/', {headers:{...authorization()}})
    .then(response => response.json())
    .then(stocks => next(stocks));

export const getStock = id => next =>
  fetch(`/stock/stocks/${id}`, {headers:{...authorization()}})
    .then(response => response.json())
    .then(stock => next(stock));

export const getStockRests = id => next =>
  fetch(`/stock/stocks/${id}/stockrest`, {headers:{...authorization()}})
    .then(response => response.json())
    .then(stockRests => next(stockRests));

export const insertStock = stock => next =>
  fetch('/stock/stocks/', {
      method: 'put',
      body: JSON.stringify(stock),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...authorization()
      }
  })
  .then(response => next(response));

  export const updateStock = stock => next =>
    fetch(`/stock/stocks/${stock.id}`, {
        method: 'post',
        body: JSON.stringify(stock),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...authorization()
        }
    })
    .then(response => next(response));
