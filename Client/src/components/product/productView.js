import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const ProductView = ({id, name, isAllowedProductEdit, productPictureIds}) => {
  return (
    <div>
      <Toolbar>
        <div>{name}</div>
        <Button href={'/products'}>List</Button>
        <Button href={`/products/${id}/edit`} disabled={!isAllowedProductEdit}>Edit</Button>
      </Toolbar>
      {productPictureIds.length > 0 &&
        <div><img src={`/metadata/images/product/${id}/${productPictureIds[0]}`}/></div>
      }
    </div>
  )
}

export default ProductView;
