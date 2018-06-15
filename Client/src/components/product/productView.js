import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const ProductView = ({id, name, isAllowedProductEdit}) => {
  return (
    <Toolbar>
      <div>{name}</div>
      <Button href={'/products'}>List</Button>
      <Button href={`/products/${id}/edit`} disabled={!isAllowedProductEdit}>Edit</Button>
    </Toolbar>
  )
}

export default ProductView;
