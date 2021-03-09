import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const HomeFormErrorDialog = (props) => {
    const { onClose, open } = props;

    const handleClose = () => {
    onClose();
    }

    return (
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Route View can only be utilized if the number of parks and campgrounds for this road trip is less than 12.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      </div>  
    )
}

export default HomeFormErrorDialog