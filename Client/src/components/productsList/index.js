import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import { getProducts } from '../../api/productApi';
import ProductsToolbar from './productsToolbar';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      showProducts: [],
      productFitler: ''
    };
  }

  componentDidMount() {
    const {products} = this.props;
    if (products) {
      this.setState({ products, showProducts: products });
    } else {
      getProducts(products =>
        this.setState({
          products,
          showProducts: products
        })
      );
    }
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
        <ProductsToolbar productFilter={this.state.productFilter} onFilterChange = {this.onFilterChange}/>
        <List>
          {this.state.showProducts.map((product, key) =>
            <ListItem
              key={key}
              role={undefined}
              dense
              button
              onClick={this.props.selectProduct(product.id)}
            >
              {(this.props.selectedProductId === product.id) &&
                <Checkbox
                  checked={true}
                  tabIndex={-1}
                  disableRipple
                />
              }
              <ListItemText primary={product.name} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

export default ProductsList;
