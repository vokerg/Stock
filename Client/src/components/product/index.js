import React from 'react';
import { getProduct, getProductRests } from '../../api/productApi';
import ProductView from './productView';
import ProductRests from './productRest';
import OrdersView from '../common/ordersView';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: "",
      productRests: []
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    getProduct(id)(product =>
      getProductRests(id)(productRests =>
        this.setState({
          ...product,
          productRests
        })
      )
    );
  }

  render() {
    const {id} = this.props.match.params;
    const {history} = this.props;
    console.log(this.state)
    return (
      <div>
        <ProductView id={id} name={this.state.name} />
        <ProductRests stockRests={this.state.productRests}/>
        <OrdersView redirectUnauthorized={() => history.push('/login')}/>
      </div>
    )
  }
}

export default Product;
