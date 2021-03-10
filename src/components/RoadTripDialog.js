import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {connect} from 'react-redux'
import { setTrip } from '../redux/actions/roadTripActions'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000'

const RoadTripDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const goToTrip = (trip) => {
    fetch(`${BASE_URL}/road_trips/${trip.id}`,{
        method: 'GET',
        headers : {
            'content-type':'application/json', 
            Authorization: `Bearer ${localStorage.token}`}, 
      })
      .then(res => res.json())
      .then(trip => props.setTrip(trip))
      .then(props.history.push("/road_trip"))

  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Go to Road Trip</DialogTitle>
      <List>
        {props.state.roadTripReducer.trips &&
        props.state.roadTripReducer.trips.map((trip) => (
          <ListItem button onClick={() => {
            goToTrip(trip)
            handleClose()}}
            key={trip.name}
          >
            <ListItemText primary={trip.name} />
          </ListItem>
        ))}
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
        setTrip: (trip) => dispatch(setTrip(trip)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoadTripDialog))