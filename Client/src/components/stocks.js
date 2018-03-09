import React from 'react';

class Stocks extends React.Component {

  constructor() {
    super();
    this.state = {
      stocks:[]
    }
  }

  componentDidMount() {
    fetch('/stocks/active')
      .then(response => response.json())
      .then(stocks => this.setState({stocks}))
    this.setState({
      stocks:[{
          id:1,
          name:"stock1"
      },
      {
        id:2,
        name:"stock2"
      }]
    });
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
