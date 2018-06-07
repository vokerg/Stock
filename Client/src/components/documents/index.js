import React from 'react';
import DocsView from './docsView'

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Documents = ({history}) => {
  return (
    <div>
    <Toolbar>
      <Button onClick={() => history.push('/newdocument')}>New document</Button>
    </Toolbar>
      <DocsView redirectUnauthorized={() => history.push('/login')}/>
    </div>
  )
};

export default Documents;
