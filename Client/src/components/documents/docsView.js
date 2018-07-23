import React from 'react';

import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import { getDocs } from '../../api';
import SingleDocView from './singleDocView';
import AccessDenied from '../common/accessDenied';
import { accessDenied } from '../../actions';

const styles = theme => ({
  column: { width: '25%' }
});

class DocsView extends React.Component {

  state = { docs:[] };
  componentDidMount = () => getDocs(docs => this.setState({ docs }))
    .catch(error => this.props.accessDenied());

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.column}>Document ID</TableCell>
              <TableCell className={classes.column}>Document type</TableCell>
              <TableCell className={classes.column}>Stock</TableCell>
              <TableCell className={classes.column}>Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
        {this.state.docs.map((doc, key) =>
          <SingleDocView key={key} doc={doc}/>
        )}
      </Paper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  //accessDenied: () => dispatch(accessDenied()),
  accessDenied: () => dispatch(accessDenied()),
});


export default withStyles(styles)(connect(() => ({}), mapDispatchToProps)(DocsView));
