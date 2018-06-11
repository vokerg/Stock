import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import OrdersView from '../common/ordersView';

const styles = theme => ({
  root: {
    width: '100%',
  },
  column: {
    flexBasis: '25%',
  }
});

const SingleDocView = ({doc, classes}) => {
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>{doc.id}</div>
            <div className={classes.column}>{doc.operationTypeName}</div>
            <div className={classes.column}>{doc.stocksName}</div>
            <div className={classes.column}>{doc.orders.length}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <OrdersView documentId={doc.id} isShort={true}/>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default withStyles(styles)(SingleDocView);
