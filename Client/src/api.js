export const getStocks = next =>
  fetch('/stocks/active')
    .then(response => response.json())
    .then(stocks => next(stocks));

export const insertStocks = stock => next =>
  fetch('/stocks/',
    {
      method: 'put',
      body: JSON.stringify(stock),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .then(response => next(response));
