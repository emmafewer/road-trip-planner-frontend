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
import { roadTripHandleOnChange } from '../redux/actions/roadTripActions';
import {connect} from 'react-redux'

const emails = ['Utah 5 Days 5 NPs', 'West Coast Dreamin'];
const BASE_URL = 'http://localhost:4000'

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  // const [newTrip, setNewTrip] = React.useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const createRoadTrip = (props) => {
    if (props.state.roadTripReducer.newTripInput === ''){
      alert('Please give your road trip a name.')
    } else {
      const road_trip = {name: props.state.roadTripReducer.newTripInput, user_id: props.state.userReducer.user.id}

      fetch(`${BASE_URL}/road_trips`,{
        method: 'POST',
        headers : {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`}, 
        body: JSON.stringify({road_trip: road_trip})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
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
            onChange={props.roadTripHandleOnChange}
            fullWidth
          />
          <ListItemAvatar onClick={() => createRoadTrip(props)}>
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

const mapStateToProps = state => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roadTripHandleOnChange: (input) => dispatch(roadTripHandleOnChange(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleDialog)