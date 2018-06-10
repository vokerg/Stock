import React from 'react';
import { getStock, getStockRests } from '../../api/stockApi';
import StockView from './stockView';
import StockRests from './stockRest';
import OrdersView from '../common/ordersView';

class Stock extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: "",
      stockRests: []
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    getStock(id)(stock =>
      getStockRests(id)(stockRests =>
        this.setState({
          ...stock,
          stockRests
        })
      )
    );
  }

  render() {
    const {id} = this.props.match.params;
    const {history} = this.props;
    return (
      <div>
        <StockView id={id} name={this.state.name} />
        <StockRests stockRests={this.state.stockRests}/>
        <OrdersView stockId={id} redirectUnauthorized={() => history.push('/login')}/>
      </div>
    )
  }
}

export default Stock;
