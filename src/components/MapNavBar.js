import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const MapNavBar = () => {
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
            type="submit"
            >
                Go To Roadtrip
            </Button>
            </form>
        </div>
    )
}

export default MapNavBar