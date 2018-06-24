import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { getProduct, insertProduct, updateProduct } from '../api/productApi';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
});

class EditProduct extends React.Component {
  constructor() {
    super();
    this.state={name: ""}
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    if (id !== undefined) {
      getProduct(id)(name => this.setState({...name}));
    }
  }

  onNameChange = event => this.setState({name: event.target.value})
  submitForm = event => {
    event.preventDefault();
    const {id} = this.props.match.params;
    const {name} = this.state;
    const {push} = this.props.history;
    if (id === undefined) {
      insertProduct({name})(product => push(`/products/${product.id}`))
    } else {
      updateProduct({id, name})(() => push(`/products/${id}`))
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <Paper className={classes.root} elevation={4}>
            <TextField
              label="Product name"
              placeholder="Start typing"
              className={classes.textField}
              margin="normal"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            <Button>Add image</Button>
            <Button type="submit">Save</Button>
          </Paper>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(EditProduct);
