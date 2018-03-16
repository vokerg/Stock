import React from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <div>
      <span><Link to="/stocks">Stocks</Link></span>
      <span><Link to="/products">Products</Link></span>
      <span><Link to="/orders">Orders</Link></span>
    </div>
  )
}

export default Navigator;
