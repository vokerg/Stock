import React from 'react';

import { getStocks } from '../api/stockApi';
import { getProducts } from '../api/productApi';
import { getOperationTypes, insertOrder } from '../api/ordersApi';

class EditDocument extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOperationType:"0",
      selectedStock:"0",
      selectedStock2:"0",
      operationTypes:[],
      transfer: false,
      orders:[this.getNewOrderLine()],
      stocks:[],
      products:[],
      stocks2:[]
    };
  }

  componentDidMount() {
    getStocks(stocks => this.setState({stocks, stocks2:stocks}));
    getProducts(products => this.setState({products}));
    getOperationTypes(operationTypes => this.setState({operationTypes}));
  }

  getNewOrderLine = () => ({
    idProduct: "0",
    qty:"0"
  })

  addNewOrderLine = () => this.setState({
    orders: [...this.state.orders, this.getNewOrderLine()]
  })

  operationTypeChange = event => {
    const selectedOperationType = event.target.value;
    this.setState({selectedOperationType})
    this.state.operationTypes.forEach(operationType => {
      const transfer = ((operationType.id.toString() === selectedOperationType) && (operationType.fTransfer));
      this.setState({transfer})
    })
  }

  orderLineChange = key => event =>
    this.setState({
      orders: this.state.orders.map(
        (order, arrayKey) => (arrayKey === key) ? {...order, [event.target.name]:event.target.value} : order
      )
    })

  stockChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  submitDocument = event => {
    event.preventDefault();
    this.state.orders.forEach(order => {
      insertOrder({
        stockId: this.state.selectedStock,
        operationTypeId: this.state.selectedOperationType,
        stockId2: (this.state.transfer) ? this.state.selectedStock2 : null,
        productId: order.idProduct,
        qty: order.qty
      })(() => console.log("order added!"))
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.submitDocument}>
        <table>
          <tbody>
            <tr>
              <td>
                <select value={this.state.selectedOperationType} onChange={this.operationTypeChange}>
                  <option value="0"></option>
                  {this.state.operationTypes.map(element =>
                    <option key={element.id} value={element.id}>{element.name}</option>
                  )}
                </select>
              </td>
              <td>
                <select value={this.state.selectedStock} name="selectedStock" onChange={this.stockChange}>
                  <option value="0"></option>
                  {this.state.stocks.map(element =>
                    <option key={element.id} value={element.id}>{element.name}</option>
                  )}
                </select>
              </td>
              <td>
                <select value={this.state.selectedStock} name="selectedStock2" onChange={this.stockChange} disabled={!this.state.transfer}>
                  <option value="0"></option>
                  {this.state.stocks.map((element, key) =>
                    <option key={key}>{element.name}</option>
                  )}
                </select>
              </td>
            </tr>
            {
              this.state.orders.map((order, key) =>
                <tr key={key}>
                  <td>
                    {
                      (key === this.state.orders.length - 1) ?
                      <button onClick={() => this.addNewOrderLine()}>Add line</button> :
                      <div/>
                    }
                  </td>
                  <td>
                    <select name="idProduct" value = {order.idProduct} onChange = {this.orderLineChange(key)}>
                      <option value="0"></option>
                      {this.state.products.map(element =>
                        <option key={element.id} value={element.id}>{element.name}</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <input
                      name="qty" type="text"
                      value = {order.qty}
                      onChange = {this.orderLineChange(key)}
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
}

export default EditDocument;
