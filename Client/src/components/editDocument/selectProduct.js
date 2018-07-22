import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


import { getProduct } from '../../reducers';
import ProductsList from '../productsList';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

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
        <TextField
          id="productName"
          label="Product"
          readonly={true}
          autoComplete="off"
          value={this.state.selectedProductName}
          margin="normal"
          onClick={this.handleClickOpen}
          className={this.props.classes.textField}
        />
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

export default withStyles(styles)(connect(mapStateToProps, () => ({}))(SelectProduct));
