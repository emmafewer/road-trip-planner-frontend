import React from 'react'
import {connect} from 'react-redux'
import ParkSideCard from './ParkSideCard'
import CampgroundSideCard from './CampgroundSideCard'
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { setActivePanel } from '../redux/actions/placesActions'
import { setRoadTripList } from '../redux/actions/roadTripActions'
import RoadTripDialog from './RoadTripDialog'

const BASE_URL = 'http://localhost:4000'

const SidePanel = (props) => {

    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen = (props) => {
        setOpen(true);
    
        fetch(`${BASE_URL}/users/${props.state.userReducer.user.id}`,{
            method: 'GET',
            headers : {Authorization: `Bearer ${localStorage.token}`}, 
          })
          .then(res => res.json())
          .then(user => props.setRoadTripList(user.road_trips))
    }

    return (
      <div className="sidePanel">
            <div style={{display: "flex", justifyContent: "center", paddingBottom: "1em", paddingTop: "1em", backgroundColor: "white"}}>
                <Button 
                variant="contained" 
                color="default"
                onClick={props.setActivePanel}
                >
                    Parks
                </Button>

                <Button 
                variant="contained" 
                color="default"
                onClick={props.setActivePanel}
                style={{marginLeft: "1em"}}
                >
                    Campgrounds
                </Button>

                <Button 
                variant="contained" 
                color="default"
                onClick={() => handleClickOpen(props)}
                style={{marginLeft: "1em"}}
                >
                    My Road Trips
                </Button>
                < RoadTripDialog open={open} onClose={handleClose}/>
            </div>
          <Container id="sidePanelContainer" >

            {props.state.placesReducer.places.parks && props.state.placesReducer.active === "Parks" 
            ? props.state.placesReducer.places.parks.map(park => < ParkSideCard park={park}/>)
            : props.state.placesReducer.places.campgrounds.map(campground => < CampgroundSideCard campground={campground}/>)
            }
         </Container>
      </div>
    );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setActivePanel: (button) => dispatch(setActivePanel(button)), 
      setRoadTripList: (trips) => dispatch(setRoadTripList(trips))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)