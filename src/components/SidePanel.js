import React from 'react'
import {connect} from 'react-redux'
import ParkSideCard from './ParkSideCard'


const getParks = (props) => {
    if (props.state.placesReducer.parks) {
        const { parks } = props.state.placesReducer
        parks.data.map(park => < ParkSideCard park={park}/>)
    }
}

const SidePanel = (props) => {
    return (
      <div className="sidePanel">
          <h1>You Made it to SidePanel!</h1>
          {getParks(props)}
      </div>
    );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
export default connect(mapStateToProps)(SidePanel)