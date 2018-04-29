import React from 'react';
import OrdersView from './common/ordersView'

const Orders = ({history}) => {
  return (
    <div>
      <div>Filter</div>
      <OrdersView redirectUnauthorized={() => history.push('/login')}/>
    </div>
  )
};

export default Orders;
