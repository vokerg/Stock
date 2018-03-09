import React, { Component } from 'react';
import logo from './logo.svg';
import Stocks from './components/stocks';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stocks />
      </div>
    );
  }
}

export default App;
