import React from 'react'
import {connect} from 'react-redux'
import ParkSideCard from './ParkSideCard'


// const getParks = (props) => {
//     if (props.state.placesReducer.parks) {
      
//         const { parks } = props.state.placesReducer
//         parks.map(park => < ParkSideCard park={park}/>)
//     }
// }

const SidePanel = (props) => {
    return (
      <div className="sidePanel">
          <h1>You Made it to SidePanel!</h1>
          {props.state.placesReducer.parks !== undefined
          &&
          props.state.placesReducer.parks.map(park => < ParkSideCard park={park}/>)}
      </div>
    );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
export default connect(mapStateToProps)(SidePanel)