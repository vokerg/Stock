import React from 'react';

import ProductsList from './productsList';

const redirectToProductId = push => productId => () => push(`products/${productId}`);

const Products = ({history}) => {
  return (
    <div>
      <ProductsList selectProduct={redirectToProductId(history.push)}/>
    </div>
  );
}

export default Products;
