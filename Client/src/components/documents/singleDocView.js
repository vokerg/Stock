import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import OrdersView from '../common/ordersView';

const styles = theme => ({
  root: {
    width: '100%',
  },
  column: {
    flexBasis: '25%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
    },
});

const docTableColumn = classes => ({children}) =>
  <div className={classes.column}>
    <Typography className={classes.heading}>
      {children}
    </Typography>
  </div>

const SingleDocView = ({doc, classes}) => {
  const DocTableColumn = docTableColumn(classes);
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <DocTableColumn>{doc.id}</DocTableColumn>
            <DocTableColumn>{doc.operationTypeName}</DocTableColumn>
            <DocTableColumn>{doc.stocksName}</DocTableColumn>
            <DocTableColumn>{doc.orders.length}</DocTableColumn>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <OrdersView documentId={doc.id} isShort={true}/>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default withStyles(styles)(SingleDocView);
