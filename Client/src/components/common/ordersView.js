import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getAllOrders, getOrdersForDoc, getOrdersForStock, getOrdersForProduct } from '../../api';
import { accessDenied } from '../../actions';

class OrdersView extends React.Component {
  state = { orders: [] }

  componentDidMount() {
    let {match, documentId, stockId, productId} = this.props;
    stockId = (match !== undefined) ? match.params.stockId : (stockId !== undefined) ? stockId : undefined

    const acceptOrders = orders => this.setState({ orders });
    const errorRedirect = error => this.props.accessDenied();

    if (stockId !== undefined) {
      getOrdersForStock(stockId)(acceptOrders).catch(errorRedirect);
    } else if (documentId !== undefined) {
      getOrdersForDoc(documentId)(acceptOrders).catch(errorRedirect);
    } else  if (productId !== undefined) {
      getOrdersForProduct(productId)(acceptOrders).catch(errorRedirect);
    } else {
      getAllOrders(acceptOrders).catch(errorRedirect);
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
                    {(isShort===undefined) && <TableCell>{order.documentId}</TableCell>}
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

const mapDispatchToProps = dispatch => ({
  accessDenied: () => dispatch(accessDenied()),
});

export default connect(() => ({}), mapDispatchToProps)(OrdersView);
