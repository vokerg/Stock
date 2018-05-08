import React from 'react';
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
    return (
      <table>
        orders view!
        {this.state.orders.map(order =>
            <tr key={order.id}>
              <td>{order.productName}</td>
              <td>{order.stockName}</td>
              <td>{order.stock2Name}</td>
              <td>{order.qty}</td>
            </tr>
        )}
      </table>
    )
  }
}

export default OrdersView;
