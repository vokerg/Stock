import React from 'react';

const StockRest = ({stockRests}) => {
  return (
    <table>
      <tbody>
        {stockRests.map((stockRest, key) => {
          return (
            <tr key={key}>
              <td>{stockRest.product.name}</td>
              <td>{stockRest.qty}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default StockRest;
