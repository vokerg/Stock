import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
import EditDocument from './components/editDocument';
import Documents from './components/documents';
import './App.css';
import mainReducer from './reducers';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

const Routes = ({history}) => {
  return (
    <div>
      <Navigator history={history}/>
      <div>
        <Route exact path="/" component= {Stocks} />
        <Route exact path="/stocks" component= {Stocks} />
        <Route exact path="/products" component= {Products} />
        <Route exact path="/products/:id" component= {Product} />
        <Route exact path="/products/:id/edit" component= {EditProduct} />
        <Route exact path="/createproduct" component= {EditProduct} />
        <Route exact path="/orders" component= {Orders} />
        <Route exact path="/createstock" component= {EditStock} />
        <Route exact path="/stocks/:id" component= {Stock} />
        <Route exact path="/stocks/:id/edit" component= {EditStock} />
        <Route exact path="/login" component= {Login} />
        <Route exact path="/logout" component= {Logout} />
        <Route exact path="/documents" component= {Documents} />
        <Route exact path="/newdocument" component= {EditDocument} />
      </div>
    </div>
  )
}

class App1Component extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const authorization = localStorage.getItem('authorization');
    this.props.loadFromLocalStorage(authorization, user);
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component = {Routes} />
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    loadFromLocalStorage: (authorization, user) => dispatch({
      type: 'LOAD_FROM_LOCAL_STORAGE',
      payload: {
        authorization,
        user
      }
    })
})

const App1 = connect(() => ({}), mapDispatchToProps)(App1Component);

class App extends Component {
  render() {
    return (
        <Provider store= { createStore(mainReducer) }>
          <App1/>
        </Provider>
    );
  }
}

export default App;
