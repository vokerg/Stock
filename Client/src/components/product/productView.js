import React from 'react';
import { Link } from 'react-router-dom';

const ProductView = ({id, name}) => {
  return (
    <div>
      <span>{name}</span>..
      <span><Link to={`/`}>List</Link></span>..
      <span><Link to={`/products/${id}/edit`}>Edit</Link></span>
    </div>
  )
}

export default ProductView;
