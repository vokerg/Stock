import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import ProductsToolbar from './productsToolbar';
import { getProducts } from '../../reducers';

class ProductsList extends React.Component {

  state = ({ productFitler: '' })

  onFilterChange = event => this.setState({ productFitler : event.target.value });

  render() {
    const showProducts = this.props.products.filter(product =>
      product.name.toUpperCase().includes(this.state.productFitler.toUpperCase())
    )
    return (
      <div>
        <ProductsToolbar productFilter={this.state.productFilter} onFilterChange = {this.onFilterChange}/>
        <List>
          {showProducts.map((product, key) =>
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

const mapStateToProps = state => ({
  products: getProducts(state)
})

export default connect(mapStateToProps, () => ({}))(ProductsList);
