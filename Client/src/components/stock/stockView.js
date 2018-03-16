import React from 'react';
import { Link } from 'react-router-dom';

const StockView = ({id, name}) => {
  return (
    <div>
      <span>{name}</span>..
      <span><Link to={`/`}>List</Link></span>..
      <span><Link to={`/stocks/${id}/edit`}>Edit</Link></span>
    </div>
  )
}

export default StockView;
