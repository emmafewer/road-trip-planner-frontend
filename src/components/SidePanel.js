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
          <Container id="sidePanelContainer" >
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
            </div>
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