import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import './App.css';
import Routes from './routes';
import { stateLogin, redirect, redirectToLogin } from './actions';
import { getRedirectTo } from './reducers';
import { getConfiguredStore } from './storeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'));
    const authorization = localStorage.getItem('authorization');
    if (!user) {
      props.redirectToLogin();
      return;
    }
    this.props.stateLogin(authorization, user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      nextProps.redirect();
      this.props.history.push(nextProps.redirectTo)
    }
  }

  render() {
    return (
      <Route path="/" component = {Routes} />
    )
  }
}

const mapStateToProps = state => ({
  redirectTo: getRedirectTo(state)
})

const mapDispatchToProps = dispatch => ({
    stateLogin: (authorization, user) => dispatch(stateLogin(authorization, user)),
    redirect: () => dispatch(redirect()),
    redirectToLogin: () => dispatch(redirectToLogin()),
})

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => (
  <BrowserRouter>
    <Provider store={ getConfiguredStore() }>
      <Route path="/" component = {AppWrapper} />
    </Provider>
  </BrowserRouter>
);
