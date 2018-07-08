import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ConfirmDialog = ({confirmRemoveOpen, confirmRemoveCancel, confirmRemoveOk, confirmText}) => {
  return(
    <Dialog
      open={confirmRemoveOpen}
      onClose={confirmRemoveCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{confirmText}</DialogTitle>
      <DialogActions>
        <Button onClick={confirmRemoveCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmRemoveOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;
