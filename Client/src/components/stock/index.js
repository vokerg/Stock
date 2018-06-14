import React from 'react';
import { getStock, getStockRests } from '../../api/stockApi';
import StockView from './stockView';
import StockRests from './stockRest';
import OrdersView from '../common/ordersView';
import AccessDenied from '../common/accessDenied';

class Stock extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: "",
      stockRests: [],
      unauthorized: false
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
    )
    .catch(error => this.setState({unauthorized: true}));
  }

  render() {
    const {id, name, stockRests} = this.state;
    return (
      this.state.unauthorized ?
      <AccessDenied/>
      :
      <div>
        {this.state.id === 0 ? "Loading..." :
        <div>
          <StockView id={id} name={name} />
          <StockRests stockRests={stockRests}/>
          <OrdersView stockId={id}/>
        </div>
        }
      </div>
    )
  }
}

export default Stock;
