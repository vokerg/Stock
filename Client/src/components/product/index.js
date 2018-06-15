import React from 'react';
import { connect } from 'react-redux';

import { getProduct, getProductRests } from '../../api/productApi';
import ProductView from './productView';
import ProductRests from './productRest';
import OrdersView from '../common/ordersView';
import { getCurrentUser } from '../../reducers';

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
    const {history, user} = this.props;
    const isAllowedProductEdit = user !== null ? user.isAllowedProductEdit : false;
    return (
      <div>
        <ProductView id={id} name={this.state.name} isAllowedProductEdit={isAllowedProductEdit}/>
        <ProductRests stockRests={this.state.productRests}/>
        <OrdersView productId={id}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: getCurrentUser(state)});

export default connect(mapStateToProps, () => ({}))(Product);
