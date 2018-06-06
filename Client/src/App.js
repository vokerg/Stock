import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import Stocks from './components/stocks';
import EditStock from './components/editStock';
import Stock from './components/stock';
import Products from './components/products';
import Navigator from './components/navigator';
import Orders from './components/orders';
import Login from './components/login';
import Logout from './components/logout';
import EditProduct from './components/editProduct';
import Product from './components/product';
import EditDocument from './components/editDocument'
import './App.css';

const Routes = (props) => {
  return (
    <div>
      <Navigator history={props.history}/>
      <div>
        <Route exact path="/" component= {Stocks} />
        <Route exact path="/stocks" component= {Stocks} />
        <Route exact path="/products" component= {Products} />
        <Route exact path="/products/:id" component= {Product} />
        <Route exact path="/products/:id/edit" component= {EditProduct} />
        <Route exact path="/orders" component= {Orders} />
        <Route exact path="/createstock" component= {EditStock} />
        <Route exact path="/stocks/:id" component= {Stock} />
        <Route exact path="/stocks/:id/edit" component= {EditStock} />
        <Route exact path="/login" component= {Login} />
        <Route exact path="/logout" component= {Logout} />
        <Route exact path="/newdocument" component= {EditDocument} />
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" component = {Routes} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
