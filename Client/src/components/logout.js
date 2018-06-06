import React from 'react'

const Logout = (props) => {
  localStorage.removeItem('authorization');
  localStorage.removeItem('user');
  props.history.push('/login');
  return (
    <div>Logging out...</div>
  )
};

export default Logout;
