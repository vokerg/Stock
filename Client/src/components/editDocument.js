import React from 'react';

import { getStocks } from '../api/stockApi';
import { getProducts } from '../api/productApi';

class EditDocument extends React.Component {
  constructor() {
    super();
    this.state = {
      orders:[this.getNewOrderLine()],
      stocks:[],
      products:[],
      stocks2:[]
    };
  }

  componentDidMount() {
    getStocks(stocks => this.setState({stocks, stocks2:stocks}));
    getProducts(products => this.setState({products}));
  }

  getNewOrderLine = () => ({
    idProduct: null,
    idStock: null,
    idStock2: null,
    qty: null
  })

  addNewOrderLine = () => {
    this.setState({
      orders: [...this.state.orders, this.getNewOrderLine()]
    })
  }

  render() {
    console.log(this.state)
    return (
      <table>
        <tbody>
          {
            this.state.orders.map((element, key) =>
              <tr key={key}>
                <td>
                  {
                    (key === this.state.orders.length - 1) ?
                    <button onClick={() => this.addNewOrderLine()}>Add line</button> :
                    <div/>
                  }
                </td>
                <td>
                  <select>
                    {this.state.stocks.map((element, key) =>
                      <option key={key}>{element.name}</option>
                    )}
                  </select>
                </td>
                <td>
                  <select>
                    {this.state.stocks.map((element, key) =>
                      <option key={key}>{element.name}</option>
                    )}
                  </select>
                </td>
                <td>
                  <select>
                    {this.state.products.map((element, key) =>
                      <option key={key}>{element.name}</option>
                    )}
                  </select>
                </td>
                <td><input type="text"/></td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}

export default EditDocument;
