import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import Stocks from './components/stocks';
import EditStock from './components/editStock';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component= {Stocks} />
            <Route exact path="/createstock" component= {EditStock} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
