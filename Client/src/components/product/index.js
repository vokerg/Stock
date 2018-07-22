import React from 'react';
import { connect } from 'react-redux';

import { getProduct, getProductRests, getProductPictures } from '../../api';
import ProductView from './productView';
import { getCurrentUser } from '../../reducers';
import ProductTabs from './productTabs';

class Product extends React.Component {
  state = {
    id: 0,
    name: "",
    productRests: [],
    productPictureIds: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    getProduct(id)(product => {
      this.setState({ ...product })
      getProductRests(id)(productRests => this.setState({ productRests }));
      getProductPictures(id)(productPictureIds => this.setState({ productPictureIds }));
    });
  }

  render() {
    const {id} = this.props.match.params;
    const {user, classes, theme} = this.props;
    const isAllowedProductEdit = user !== null ? user.isAllowedProductEdit : false;
    return (
      <div>
        <ProductView
          id={id}
          name={this.state.name}
          isAllowedProductEdit={isAllowedProductEdit}
          productPictureIds={this.state.productPictureIds}
        />
        <ProductTabs id={id} productRests={this.state.productRests}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: getCurrentUser(state) });

export default connect(mapStateToProps, () => ({}))(Product);
