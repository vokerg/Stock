import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

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
    const {selectedProductId, selectedProductName} = props;
    this.setState({selectedProductId, selectedProductName})
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
                products={this.props.products}
              />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SelectProduct;
