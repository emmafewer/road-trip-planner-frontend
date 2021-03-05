import React from 'react'
import {connect} from 'react-redux'
import RListItem from './RListItem'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const generateList = (props) => {
  // let campgrounds = props.state.roadTripReducer.trip.campgrounds
  // let parks = props.state.roadTripReducer.trip.parks
  // let places = campgrounds.concat(parks)
  return (props.state.roadTripReducer.places.sort((a, b) => a.order - b.order).map(place => < RListItem place={place} />))
}

const RList= (props) => {
  
    return (
      <div className="fullList">
        {props.state.roadTripReducer.tripTotal &&
          <Card style={{height: "100%", width: "94%", textAlign: "center"}} >
            <CardContent >
              <Typography Typography variant="h5" component="h2">
                {props.state.roadTripReducer.trip.name}
              </Typography>
              <Typography Typography variant="subtitle1" component="h2">
                Total Distance: {props.state.roadTripReducer.tripTotal.totalDistance} miles
              </Typography>
              <Typography Typography variant="subtitle1" component="h2">
                Total Hours: {props.state.roadTripReducer.tripTotal.totalDuration} hours
              </Typography>
            </CardContent>
          </Card >
        }
        {props.state.roadTripReducer.places 
        && generateList(props)
        }
      </div>
    )
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

export default connect(mapStateToProps)(RList)