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

    const handleClickOpen = (props) => {
        setOpen(true);
    }

    return (
        <div className="rMapNav">
            <Button 
            variant="contained" 
            color="default"
            type="submit"
            name="Main Map"
            onClick={() => props.setShow("Map")}
            >
                Map
            </Button>

            <Button 
            variant="contained" 
            color="default"
            type="submit"
            >
                Calendar
            </Button>

            <Button 
            variant="contained" 
            color="default"
            type="submit"
            >
                Notes
            </Button>
            <Button 
            variant="contained" 
            color="default"
            name="Route View"
            onClick={() => handleClickOpen(props)}
            >
                Route View
            </Button>
            < StartAndEndDialog open={open} onClose={handleClose}/>

            <Button 
            variant="outlined" 
            color="default"
            style={{display: 'inline-flex'}}
            >Edit Dates
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