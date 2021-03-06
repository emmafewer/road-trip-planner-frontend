import React from 'react'
import {connect} from 'react-redux'
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { setActivePanel } from '../redux/actions/placesActions';
import ParkSideCard from '../components/ParkSideCard'
import RSideCard from './RSideCard'
import RList from './RList'


const RSidePanel = props => {

    return (
        <div className="rSidePanel">
            <div style={{display: "flex", justifyContent: "center", paddingBottom: "1em"}}>
                <Button 
                variant="contained" 
                color="default"
                onClick={() => props.setActivePanel("Parks")}
                >
                    Parks
                </Button>

                <Button 
                variant="contained" 
                color="default"
                style={{marginLeft: "1em"}}
                onClick={() => props.setActivePanel("Campgrounds")}
                >
                    Campgrounds
                </Button>
            </div>
            <Container id="rSidePanelContainer" >

                {props.state.placesReducer.active === "Parks"
                ? props.state.roadTripReducer.trip.parks.map(park => < RSideCard place={park}/>)
                : props.state.placesReducer.active === "Campgrounds" 
                ? props.state.roadTripReducer.trip.campgrounds.map(campground => < RSideCard place={campground}/>)
                : props.state.placesReducer.active === "Route View" 
                && <RList />
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
      setActivePanel: (button) => dispatch(setActivePanel(button))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RSidePanel)