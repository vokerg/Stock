import React from 'react';
import Button from '@material-ui/core/Button';

const AccessDenied = () => {
  return (
    <div>
      <div>Access denied</div>
      <div><Button href={`/logout`}>Re-login</Button></div>
    </div>
  )
}

export default AccessDenied;
