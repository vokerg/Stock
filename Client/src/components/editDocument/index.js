import React from 'react';

import { getStocks } from '../api/stockApi';
import { getProducts } from '../api/productApi';
import { getOperationTypes, insertDoc } from '../api/ordersApi';
import EditDocumentView from './editDocumentView';

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
    const {orders, selectedStock, selectedOperationType, transfer} = this.state;

    let document = {
      stockId: selectedStock,
      operationTypeId: selectedOperationType,
      stockId2: (transfer) ? selectedStock2 : null,
      orders: orders.map(order => ({
        stockId: selectedStock,
        operationTypeId: selectedOperationType,
        stockId2: (transfer) ? selectedStock2 : null,
        productId: order.idProduct,
        qty: order.qty
      }))
    };
    insertDoc(document)(() => console.log("order added!"));
  }

  render() {
    return (
      <EditDocumentView
        selectedOperationType = {this.state.selectedOperationType}
        operationTypes = {this.state.operationType}
        selectedStock = {this.state.selectedStock}
        selectedStock2 = {this.state.selectedStock2}
        orders = {this.state.orders}
        products = {this.state.products}
        transfer = {this.stock.transfer}
        submitDocument = {this.submitDocument},
        operationTypeChange = {this.operationTypeChange}
        stockChange = {this.stockChange}
        orderLineChange = {this.orderLineChange}
      />
    )
  }
}

export default EditDocument;
