import React from 'react';

import SelectProduct from './selectProduct';

const getProductName = (products, idProduct) => {

    const product = products.find(element => element.id === idProduct);
    console.log(idProduct, products, product)
    return (product) ? product.name : "";
}

const EditOrdersView = ({orders, addNewOrderLine, orderLineInputChange, products, productChange}) =>
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
            selectedProductName={getProductName(products, order.idProduct)}
            products={products}

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
