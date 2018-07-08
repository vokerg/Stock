import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import './App.css';
import Routes from './routes';
import { stateLogin } from './actions';
import { getConfiguredStore } from './storeProvider';

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
  <Provider store={ getConfiguredStore() }>
    <AppWrapper/>
  </Provider>
);
