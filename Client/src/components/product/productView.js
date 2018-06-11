import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const ProductView = ({id, name}) => {
  return (
    <Toolbar>
      <div>{name}</div>
      <Button href={'/products'}>List</Button>
      <Button href={`/products/${id}/edit`}>Edit</Button>
    </Toolbar>
  )
}

export default ProductView;
