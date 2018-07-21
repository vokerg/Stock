import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import DialogContent from '@material-ui/core/DialogContent';

const SaveDraftDialog = ({dlgOpen, handleClose, handleCancel, handleOk, setDraftName}) => {
  return(
    <Dialog
      open={dlgOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="responsive-dialog-title">Save draft</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          onChange={setDraftName}
          margin="dense"
          id="name"
          label="Draft name"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveDraftDialog;
