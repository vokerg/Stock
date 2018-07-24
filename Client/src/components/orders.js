import React from 'react';
import OrdersView from './common/ordersView';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class Orders extends React.Component {
  state = {
    docFilter: "",
    docTypeFilter: "",
    productName: "",
    stockName: "",
    qtyMore: 0
  };

  onFilterChange = event => this.setState({ [event.target.name]: event.target.value });

  render () {
    const { docFilter, docTypeFilter, productName, stockName, qtyMore } = this.state;
    return (
      <OrdersView>
        <TableRow>
          <TableCell>
            <TextField
              name={"docFilter"}
              type="search"
              margin="normal"
              value={docFilter}
              onChange={this.onFilterChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              name={"docTypeFilter"}
              type="search"
              margin="normal"
              value={docTypeFilter}
              onChange={this.onFilterChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              name={"productName"}
              type="search"
              margin="normal"
              value={productName}
              onChange={this.onFilterChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              name={"stockName"}
              type="search"
              margin="normal"
              value={stockName}
              onChange={this.onFilterChange}
            />
          </TableCell>
          <TableCell>
            {"> "}
            <TextField
              name={"qtyMore"}
              type="search"
              margin="normal"
              value={qtyMore}
              onChange={this.onFilterChange}
            />
          </TableCell>
        </TableRow>
      </OrdersView>
    )
  }

};

export default Orders;
