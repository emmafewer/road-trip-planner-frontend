import React from 'react'
import Button from '@material-ui/core/Button';
import { joinPlaces, setShow } from '../redux/actions/roadTripActions';
import { setActivePanel } from '../redux/actions/placesActions';
import {connect} from 'react-redux'
import StartAndEndDialog from './StartAndEndDialog'
import RShowMap from './RShowMap'

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

    // const handleShow = (e, props) => {
    //     debugger
    //     props.setShow(e.target.name)
    // }

    return (
        <div className="rMapNav">
            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            name="Main Map"
            onClick={(e) => props.setShow(e)}
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
            name="Route View"
            onClick={(e) => {
                props.setShow(e)
                props.setActivePanel(e)}}
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
        joinPlaces: (places) => dispatch(joinPlaces(places)),
        setActivePanel: (button) => dispatch(setActivePanel(button)),
        setShow: (name) => dispatch(setShow(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RMapNavBar)