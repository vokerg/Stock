import React from 'react';
import { getStocks } from '../api/stockApi';
import { Link } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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
        <Toolbar>
          <Button onClick={() => this.props.history.push('/newdocument')}>New document</Button>
          <Button onClick={() => this.props.history.push('/createstock')}>New stock</Button>
        </Toolbar>
        <Paper>
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
        </Paper>
      </div>
    )
  }
}

export default Stocks;
