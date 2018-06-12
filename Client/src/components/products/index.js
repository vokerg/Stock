import React from 'react';
import { Link } from 'react-router-dom'

import { getProducts } from '../../api/productApi';
import ProductsView from './productsView';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      showProducts: [],
      productFitler: ''
    };
  }

  componentDidMount() {
    getProducts(products =>
      this.setState({
        products,
        showProducts: products
      })
    );
  }

  onFilterChange = event => {
    const productFitler = event.target.value;
    this.setState({
      productFitler,
      showProducts: this.state.products.filter(product =>
        product.name.toUpperCase().includes(productFitler.toUpperCase())
      )
    });
  }

  render() {
    return (
      <div>
        <ProductsView productFilter={this.state.productFilter} onFilterChange = {this.onFilterChange}/>
        <table>
          <tbody>
            {this.state.showProducts.map((product, key) =>
              <tr key={key}>
                <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Products;
