import React from 'react';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getOrders } from '../../api/ordersApi';

class OrdersView extends React.Component {

  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    const {match} = this.props;
    let stockId = (match !== undefined) ? match.params.stockId : undefined
    if (stockId === undefined) {
      getOrders(orders => this.setState({
        orders
      }))
      .catch(error => this.props.redirectUnauthorized());
    } else {

    }
  }

  render() {
    console.log(this.state.orders)
    return (
      <div>
        <div>Recent orders</div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document ID</TableCell>
                <TableCell>Document type</TableCell>
                <TableCell>Product name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>QTY</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.orders.map(order =>
                  <TableRow key={order.id}>
                    <TableCell>{order.document_id}</TableCell>
                    <TableCell>{order.operationTypeName}</TableCell>
                    <TableCell><Link to={`/products/${order.productId}`}>{order.productName}</Link></TableCell>
                    <TableCell><Link to={`/products/${order.stockId}`}>{order.stocksName}</Link></TableCell>
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
