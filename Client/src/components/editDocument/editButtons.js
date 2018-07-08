import React from 'react';

const EditButtons = ({saveDraftDocument, clearDraftDocument, draft}) => {
  return (
    <tr>
      <td>
        <button onClick = {saveDraftDocument}>Save draft</button>
        {
          draft &&
          <button onClick = {clearDraftDocument}>Clear draft</button>
        }
      </td>
      <td><button type="submit">Submit</button></td>
    </tr>
  )
}

export default EditButtons;
