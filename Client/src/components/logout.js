import React from 'react';
import { connect } from 'react-redux';

import { stateLogout } from '../actions';

const Logout = ({stateLogout, history}) => {
  localStorage.removeItem('authorization');
  localStorage.removeItem('user');
  stateLogout();
  history.push('/login');
  return (
    <div>Logging out...</div>
  )
};

const mapDispatchToProps = dispatch => ({
  stateLogout: () => dispatch(stateLogout())
})

export default connect(() => ({}), mapDispatchToProps)(Logout);
