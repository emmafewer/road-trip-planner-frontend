import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Draggable from 'react-draggable'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RListItem = (props) => {
  const classes = useStyles();

  const handleTime = () => {
    if (props.place.duration > 90) {
      return (`${(props.place.duration / 60).toFixed(2)} hours to next location`)
    } else if (props.place.duration !== null) {
      return (`${props.place.duration} minutes to next location`)
    } 
  }

  const handleMiles = () => {
    if (props.place.distance !== null) {
      return (`${props.place.distance} miles to next location`)
    }
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <Card style={{height: "100%", backgroundColor: "#e0e0e0"}} >
            <CardContent >
            <Typography variant="h5" component="h2" style={{fontWeight: "bold", fontSize: "32px", color: "white", textShadow: "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000"}}>
                {props.place.order}
                </Typography>
            </CardContent>
        </Card >
      </Grid >
      <Grid item xs={2}>
        <Card className={classes.root}>
          <CardContent >
                <Typography variant="h5" component="h2">
                  {props.place.name}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                  {handleMiles()}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                  {handleTime()}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                {/* {props.trip.start_date} - {props.trip.end_date} */}
                </Typography>
            </CardContent>
        </Card >
      </Grid >
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

export default connect(mapStateToProps)(RListItem)