import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ProductRests from './productRest';
import OrdersView from '../common/ordersView';
import { getCurrentUser } from '../../reducers';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class ProductTabs extends React.Component {

  state = { currentView: 0 };
  handleViewChange = (event, value) => this.setState({ currentView: value });
  handleChangeIndex = index => this.setState({ currentView: index });

  render() {
    const {id, classes, theme, productRests} = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.currentView}
            onChange={this.handleViewChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Stock rest" />
            <Tab label="Orders" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.currentView}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ProductRests stockRests={productRests}/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <OrdersView productId={id}/>
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProductTabs);
