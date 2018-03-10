import React from 'react';
import { getStocks } from '../api';

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
                <td>{stock.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Stocks;
