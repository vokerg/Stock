import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import PictureGallery from '../common/pictureGallery';

const ProductView = ({id, name, isAllowedProductEdit, productPictureIds}) => {
  return (
    <div>
      <Toolbar>
        <div>{name}</div>
        <Button href={'/products'}>List</Button>
        <Button href={`/products/${id}/edit`} disabled={!isAllowedProductEdit}>Edit</Button>
        <Button href={`/products/${id}/imagemanagement`} disabled={!isAllowedProductEdit}>Images</Button>
      </Toolbar>

      <PictureGallery
        productPictureIds={productPictureIds}
        imgPathStatic={`/metadata/images/product/${id}`}
      />
    </div>
  )
}

export default ProductView;
