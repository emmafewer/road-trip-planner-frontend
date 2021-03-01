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
import { setTrip } from '../redux/actions/roadTripActions';

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
        </CardActions>
        </Card>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTrip: (trip) => dispatch(setTrip(trip))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(RoadTripCard))