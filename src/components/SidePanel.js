import React from 'react'
import {connect} from 'react-redux'
import ParkSideCard from './ParkSideCard'
import CampgroundSideCard from './CampgroundSideCard'
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { setActivePanel } from '../redux/actions/placesActions';

const SidePanel = (props) => {
    return (
      <div className="sidePanel">
            <div style={{display: "flex", justifyContent: "center", paddingBottom: "1em", paddingTop: "1em", backgroundColor: "white"}}>
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
                style={{marginLeft: "1em"}}
                >
                    Campgrounds
                </Button>
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
      setActivePanel: (button) => dispatch(setActivePanel(button))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)