import React from 'react';
import { Link } from 'react-router-dom';
import { getStock, getStockRest } from '../api';
import StockView from './stockView';
import StockRests from './stockRest';

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
        });
      );
    );
  }

  render() {
    const {id} = this.props.match.params;
    return (
      <StockView id={id} name={this.state.name} />
      <StockRest stockRests={thi.state.stockRests}/>
    )
  }
}

export default Stock;
