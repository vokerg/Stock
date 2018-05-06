import React from 'react';
import { Link } from 'react-router-dom'
import { getProducts } from '../api/productApi';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    getProducts(products =>
      this.setState({
        products
      })
    );
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.products.map((product, key) =>
            <tr key={key}>
              <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Products;
