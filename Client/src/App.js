import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import './App.css';
import Routes from './routes';
import mainReducer from './reducers';
import middleware from './middleware';
import { stateLogin } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const authorization = localStorage.getItem('authorization');
    this.props.stateLogin(authorization, user);
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
    stateLogin: (authorization, user) => dispatch(stateLogin(authorization, user))
})

const AppWrapper = connect(() => ({}), mapDispatchToProps)(App);

export default () => (
  <Provider store={ createStore(mainReducer, middleware) }>
    <AppWrapper/>
  </Provider>
);
