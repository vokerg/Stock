import React from 'react';

const EditOrdersView = ({orders, addNewOrderLine, orderLineChange, products}) =>
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
          <select name="idProduct" value = {order.idProduct} onChange = {orderLineChange(key)}>
            <option value="0"></option>
            {products.map(element =>
              <option key={element.id} value={element.id}>{element.name}</option>
            )}
          </select>
        </td>
        <td>
          <input
            name="qty" type="text"
            value = {order.qty}
            onChange = {orderLineChange(key)}
            disabled={order.idProduct === "0"}
          />
        </td>
      </tr>
    )
  )
}

export default EditOrdersView;
