import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import Stocks from './components/stocks';
import EditStock from './components/editStock';
import Stock from './components/stock';
import Navigator from './components/navigator'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <div>
              <Route exact path="/" component= {Stocks} />
              <Route exact path="/createstock" component= {EditStock} />
              <Route exact path="/stocks/:id" component= {Stock} />
              <Route exact path="/stocks/:id/edit" component= {EditStock} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
