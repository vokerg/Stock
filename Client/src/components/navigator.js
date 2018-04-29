import React from 'react';
import { Link } from 'react-router-dom';

const Navigator = (props) => {
  return (
    <div>
      <span><Link to="/stocks">Stocks</Link></span>
      <span><Link to="/products">Products</Link></span>
      <span><Link to="/orders">Orders</Link></span>
      <span><Link to="/login">Login</Link></span>
      <span><Link to="/logout">Logout</Link></span>
    </div>
  )
}

export default Navigator;
