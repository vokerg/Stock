import React from 'react';
import { getStocks } from '../api/stockApi';
import { Link } from 'react-router-dom'

class Stocks extends React.Component {

  constructor() {
    super();
    this.state = {
      stocks:[]
    }
  }

  componentDidMount() {
    getStocks(stocks => this.setState({stocks}));
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.stocks.map((stock, key) =>
              <tr key ={key}>
                <td>{stock.id}</td>
                <td><Link to={`/stocks/${stock.id}`}>{stock.name}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Stocks;
