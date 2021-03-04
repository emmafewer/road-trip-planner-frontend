import React from 'react'
import Button from '@material-ui/core/Button';
import { joinPlaces } from '../redux/actions/roadTripActions';
import {connect} from 'react-redux'
import StartAndEndDialog from './StartAndEndDialog'

const RMapNavBar = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    // const setStartAndEnd = (props) => {
    //     return ( <StartAndEndDialog open={open} onClose={handleClose}/>)
    // }

    const addPlacestoProps = (props) => {
        let campgrounds = props.state.roadTripReducer.trip.campgrounds
        let parks = props.state.roadTripReducer.trip.parks
        let places = campgrounds.concat(parks)
        props.joinPlaces(places)
        // setStartAndEnd(props)
    }

    return (
        <div className="rMapNav">
            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            >
                Map
            </Button>

            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            >
                Calendar
            </Button>

            <Button 
            variant="contained" 
            color="primary"
            type="submit"
            >
                Notes
            </Button>
            <Button 
            variant="contained" 
            color="primary"
            onClick={() => addPlacestoProps(props)}
            >
                Route View
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinPlaces: (places) => dispatch(joinPlaces(places))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RMapNavBar)