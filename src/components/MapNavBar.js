import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom'

const goToRoadTrips = (props) => {
    props.history.push('/road_trips')
}

const MapNavBar = (props) => {
    return (
        <div className="MapNav">
          
            <form className="campAvailability">
            <p>Check Campground Availability</p>
            <TextField 
            size="small" 
            id="start" 
            name="homeForm"
            label="Check In Date" 
            variant="outlined"
            />
            <TextField 
            size="small" 
            id="end" 
            name="homeForm"
            label="Check Out Date" 
            variant="outlined" 
            />
            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            >
                Check Availability
            </Button>

            <Button 
            variant="contained" 
            color="primary"
            onClick={() => goToRoadTrips(props)}
            >
                Go To Roadtrip
            </Button>
            </form>
        </div>
    )
}

export default withRouter(MapNavBar)