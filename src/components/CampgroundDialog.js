import React from 'react';
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

const BASE_URL = 'http://localhost:4000'

const CampgroundDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
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
      .then(roadtrip => createCampground(roadtrip, props))
    }
  }

  const createCampground = (roadtrip, props) => {
    fetch(`${BASE_URL}/campgrounds`,{
      method: 'POST',
      headers : {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`}, 
      body: JSON.stringify({campground: props.campground})
    })
    .then(res => res.json())
    .then(campground => createCampgroundBook(campground, roadtrip))
  }

  const createCampgroundBook = (campground, roadtrip) => {
    fetch(`${BASE_URL}/campground_books`,{
      method: 'POST',
      headers : {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`}, 
      body: JSON.stringify({road_trip_id: roadtrip.id, campground_id: campground.id})
    })
    .then(res => res.json())
    // .then(save => console.log(save))
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Add to Road Trip</DialogTitle>
      <List>
        {props.state.roadTripReducer.trips &&
        props.state.roadTripReducer.trips.map((trip) => (
          <ListItem button onClick={() => {
            createCampground(trip, props)
            handleClose()}}
            key={trip.name}
          >
            <ListItemText primary={trip.name} />
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
          <ListItemAvatar onClick={() => {
            createRoadTrip(props)
            handleClose()}}>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
      </List>
    </Dialog>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CampgroundDialog)