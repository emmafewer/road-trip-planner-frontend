import React from 'react'
import {connect} from 'react-redux'
// import ParkSideCard from './ParkSideCard'
import { Container } from '@material-ui/core'

const RSidePanel = (props) => {
    return (
      <div className="rSidePanel">
          <Container id="rSidePanelContainer" >
            {/* {props.state.placesReducer.places.parks
            &&
            props.state.placesReducer.places.parks.map(park => < ParkSideCard park={park}/>)} */}
         </Container>
      </div>
    );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
export default connect(mapStateToProps)(RSidePanel)