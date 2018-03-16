import React from 'react';

const StockRest = ({stockRests}) => {
  return (
    <table>
      <tbody>
        {stockRests.map(stockRest => {
          return (
            <tr>
              <td>{stockRest.material}</td>
              <td>{stockRest.qty}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default StockRest;
