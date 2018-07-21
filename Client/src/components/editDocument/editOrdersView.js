import React from 'react';

import SelectProduct from './selectProduct';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
});

const EditOrdersView = ({orders, addNewOrderLine, orderLineInputChange, productChange, classes}) =>
{
  return (
    orders.map((order, key) =>
      <div className={classes.container}>
        <SelectProduct
          productChange={productChange(key)}
          selectedProductId={order.idProduct}
        />
        <TextField
          id="qty"
          label="QTY"
          name="qty"
          className={classes.textField}
          value={order.qty}
          onChange={orderLineInputChange(key)}
          margin="normal"
          disabled={order.idProduct === "0"}
        />
        {
          (key === orders.length - 1) &&
          <Button onClick={() => addNewOrderLine()}>Add line</Button>
        }
      </div>
    )
  )
}

export default withStyles(styles)(EditOrdersView);
