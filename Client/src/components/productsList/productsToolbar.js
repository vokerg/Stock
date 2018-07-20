import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop: 0,
      width: 200,
    },
});

const ProductsView = ({productFilter, onFilterChange, classes}) => {
  return (
    <Toolbar>
      <Button href={`/createproduct`}>new</Button>
      <TextField
        label="Product filter"
        type="search"
        className={classes.textField}
        margin="normal"
        value={productFilter}
        onChange={onFilterChange}
      />
    </Toolbar>
  )
}

export default withStyles(styles)(ProductsView);
