import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getDocs } from '../../api/ordersApi';

class DocsView extends React.Component {
  constructor() {
    super();
    this.state = {
      docs:[]
    }
  }

  componentDidMount() {
    getDocs(docs => this.setState({docs}));
  }

  render() {
    console.log(this.state.docs)
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document ID</TableCell>
              <TableCell>Document type</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.docs.map((doc, key) =>
              <TableRow key={key}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.operationTypeName}</TableCell>
                <TableCell>{doc.stocksName}</TableCell>
                <TableCell>{doc.orders.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default DocsView;
