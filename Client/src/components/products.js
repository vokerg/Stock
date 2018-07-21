import React from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions';
import ProductsList from './productsList';

const redirectToProductId = push => productId => () => push(`products/${productId}`);

const Products = ({history, fetchProducts}) => {
  fetchProducts();
  return (
    <div>
      <ProductsList selectProduct={redirectToProductId(history.push)}/>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(() => ({}), mapDispatchToProps)(Products);
