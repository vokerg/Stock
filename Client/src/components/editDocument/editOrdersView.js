import React from 'react';

import SelectProduct from './selectProduct';

const EditOrdersView = ({orders, addNewOrderLine, orderLineInputChange, productChange}) =>
{
  return (
    orders.map((order, key) =>
      <tr key={key}>
        <td>
          {
            (key === orders.length - 1) ?
            <button onClick={() => addNewOrderLine()}>Add line</button> :
            <div/>
          }
        </td>
        <td>
          <SelectProduct
            productChange={productChange(key)}
            selectedProductId={order.idProduct}
          />
        </td>
        <td>
          <input
            name="qty" type="text"
            value = {order.qty}
            onChange = {orderLineInputChange(key)}
            disabled={order.idProduct === "0"}
          />
        </td>
      </tr>
    )
  )
}

export default EditOrdersView;
