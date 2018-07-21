import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import { getProduct } from '../../reducers';
import ProductsList from '../productsList';

class SelectProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedProductId: null,
      selectedProductName: "",
      open: false
    };
  }

  componentWillReceiveProps(props) {
    const {selectedProductId, product} = props;
    this.setState({selectedProductId, selectedProductName:(product) ? product.name : ""})
  }

  handleClickOpen = () => this.setState({open:true})
  handleClose = () => this.setState({open:false})
  selectProduct = selectedProductId => () => {
    this.setState({open:false})
    this.props.productChange(selectedProductId);
  }

  render() {
    return (
      <div>
        {this.state.selectedProductName}
        <Button onClick={this.handleClickOpen}>Select</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
              <ProductsList
                selectedProductId={this.state.selectedProductId}
                selectProduct={this.selectProduct}
              />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, {selectedProductId}) => ({
  product: getProduct(state, selectedProductId)
})

export default connect(mapStateToProps, () => ({}))(SelectProduct);
