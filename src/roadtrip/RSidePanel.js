import React from 'react'
import {connect} from 'react-redux'
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { setActivePanel } from '../redux/actions/placesActions';
import ParkSideCard from '../components/ParkSideCard'
import CampgroundSideCard from '../components/CampgroundSideCard'

const RSidePanel = props => {
    return (
        <div className="rSidePanel">
            <Container id="rSidePanelContainer" >
                <div>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.setActivePanel}
                    >
                        Parks
                    </Button>

                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.setActivePanel}
                    >
                        Campgrounds
                    </Button>

                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={props.setActivePanel}
                    >
                        View All
                    </Button>
                </div>
                {props.state.placesReducer.active === "Parks"
                ? props.state.roadTripReducer.trip.parks.map(park => < ParkSideCard park={park}/>)
                : props.state.roadTripReducer.trip.campgrounds.map(campground => < CampgroundSideCard campground={campground}/>)
                }
                {/* {props.state.placesReducer.active === "View All" && <List />} */}
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
      setActivePanel: (button) => dispatch(setActivePanel(button))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RSidePanel)