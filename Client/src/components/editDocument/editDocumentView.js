import React from 'react';

const EditDocumentView = ({
  selectedOperationType,
  operationTypes,
  selectedStock,
  selectedStock2,
  orders,
  products,
  transfer,
  submitDocument,
  operationTypeChange,
  stockChange,
  orderLineChange
}) => {
  return (
    <form onSubmit={submitDocument}>
      <table>
        <tbody>
          <tr>
            <td>
              <select value={selectedOperationType} onChange={operationTypeChange}>
                <option value="0"></option>
                {operationTypes.map(element =>
                  <option key={element.id} value={element.id}>{element.name}</option>
                )}
              </select>
            </td>
            <td>
              <select value={selectedStock} name="selectedStock" onChange={stockChange}>
                <option value="0"></option>
                {stocks.map(element =>
                  <option key={element.id} value={element.id}>{element.name}</option>
                )}
              </select>
            </td>
            <td>
              <select value={selectedStock2} name="selectedStock2" onChange={stockChange} disabled={!transfer}>
                <option value="0"></option>
                {stocks.map((element, key) =>
                  <option key={key}>{element.name}</option>
                )}
              </select>
            </td>
          </tr>
          {
            orders.map((order, key) =>
              <tr key={key}>
                <td>
                  {
                    (key === orders.length - 1) ?
                    <button onClick={() => this.addNewOrderLine()}>Add line</button> :
                    <div/>
                  }
                </td>
                <td>
                  <select name="idProduct" value = {order.idProduct} onChange = {this.orderLineChange(key)}>
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
          }
          <tr>
            <td><button type="submit">Submit</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export const EditDocumentView;
