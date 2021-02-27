import React from 'react'
import {connect} from 'react-redux'
import ParkSideCard from './ParkSideCard'
import { Container } from '@material-ui/core'

const SidePanel = (props) => {
    return (
      <div className="sidePanel">
          <Container id="sidePanelContainer" >
            {props.state.placesReducer.parks
            &&
            props.state.placesReducer.parks.map(park => < ParkSideCard park={park}/>)}
         </Container>
      </div>
    );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
export default connect(mapStateToProps)(SidePanel)