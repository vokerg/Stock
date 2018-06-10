import React from 'react';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getAllOrders, getOrdersForDoc, getOrdersForStock, getOrdersForProduct } from '../../api/ordersApi';

class OrdersView extends React.Component {

  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    let {match, documentId, stockId, productId, isShort} = this.props;
    stockId = (match !== undefined) ? match.params.stockId : (stockId !== undefined) ? stockId : undefined
    if (stockId !== undefined) {
      getOrdersForStock(stockId)(orders => this.setState({orders}))
      .catch(error => this.props.redirectUnauthorized());
    } else if (documentId !== undefined) {
      getOrdersForDoc(documentId)(orders => this.setState({orders}))
      .catch(error => this.props.redirectUnauthorized());
    } else  if (productId !== undefined) {
      getOrdersForProduct(productId)(orders => this.setState({orders}))
      .catch(error => this.props.redirectUnauthorized());
    } else {
      getAllOrders(orders => this.setState({orders}))
      .catch(error => this.props.redirectUnauthorized());
    }
  }

  render() {
    const { isShort } = this.props;
    return (
      <div>
        <Paper>
          <Table>
            {(isShort===undefined) &&
            <TableHead>
              <TableRow>
                <TableCell>Document ID</TableCell>
                <TableCell>Document type</TableCell>
                <TableCell>Product name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>QTY</TableCell>
              </TableRow>
            </TableHead>
          }
            <TableBody>
              {this.state.orders.map(order =>
                  <TableRow key={order.id}>
                    <TableCell>{order.documentId}</TableCell>
                    {(isShort===undefined) && <TableCell>{order.operationTypeName}</TableCell>}
                    <TableCell><Link to={`/products/${order.productId}`}>{order.productName}</Link></TableCell>
                    {(isShort===undefined) && <TableCell><Link to={`/stocks/${order.stockId}`}>{order.stocksName}</Link></TableCell>}
                    <TableCell numeric>{order.qty}</TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default OrdersView;
