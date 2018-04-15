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
      }));
    } else {

    }
  }

  render() {
    console.log("orders", this.state.orders)
    return (
      <div>
        orders view
        {this.state.orders.map(order =>
            <div key={order.id}>{order.id}</div>
        )}
      </div>
    )
  }
}

export default OrdersView;
