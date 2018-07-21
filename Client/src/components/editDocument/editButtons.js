import React from 'react';
import Button from '@material-ui/core/Button';

const EditButtons = ({saveDraftDocument, clearDraftDocument, draft}) => {
  return (
    <div>
        <Button onClick = {saveDraftDocument}>Save draft</Button>
        {
          draft &&
          <Button onClick = {clearDraftDocument}>Clear draft</Button>
        }
        <Button type="submit">Submit</Button>
    </div>
  )
}

export default EditButtons;
