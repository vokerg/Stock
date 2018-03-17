import React from 'react';
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
              <td>{product.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Products;
