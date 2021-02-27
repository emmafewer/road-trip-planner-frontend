import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const emails = ['Utah 5 Days 5 NPs', 'West Coast Dreamin'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  // const [newTrip, setNewTrip] = React.useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const createRoadTrip = (e) => {
    debugger
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add to Road Trip</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Road Trip"
            type="trip"
            fullWidth
          />
          <ListItemAvatar onClick={createRoadTrip}>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      </List>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };