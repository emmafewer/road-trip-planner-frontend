import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { setRoadTripList, setTrip } from '../redux/actions/roadTripActions'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const BASE_URL = 'http://localhost:4000'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RoadTripCard= (props) => {
  const classes = useStyles();

  const goToTrip = () => {
    fetch(`${BASE_URL}/road_trips/${props.trip.id}`,{
        method: 'GET',
        headers : {
            'content-type':'application/json', 
            Authorization: `Bearer ${localStorage.token}`}, 
      })
      .then(res => res.json())
      .then(trip => props.setTrip(trip))
      .then(props.history.push("/road_trip"))
  }

  const setNewRoadTrips = (props) => {
    const newRoadTripList = props.state.roadTripReducer.trips.filter(trip => trip.id !== props.trip.id)
    props.setRoadTripList(newRoadTripList)
  }

  const deleteTrip = () => {
    fetch(`${BASE_URL}/road_trips/${props.trip.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(setNewRoadTrips(props))
  }

  return (
    <Box m={2} pt={3}>
        <Card className={classes.root} >
        <CardContent>
            <Typography variant="h5" component="h2">
            {props.trip.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {props.trip.start_date} - {props.trip.end_date}
            </Typography>
        </CardContent>
        <CardActions>
            <Button 
            size="small"
            onClick={goToTrip}
            >Go To Trip</Button>
                    <IconButton 
            aria-label="delete road trip"
            color="inherit" 
            id="delete"
            onClick={() => deleteTrip(props)}>
          <DeleteIcon />
        </IconButton>
        </CardActions>

        </Card>
    </Box>
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
        setRoadTripList: (trips) => dispatch(setRoadTripList(trips))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoadTripCard))