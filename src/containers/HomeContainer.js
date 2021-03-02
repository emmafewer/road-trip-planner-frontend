import React from 'react'
import Map from '../components/Map.js'
import HomeForm from '../components/HomeForm'
import Campgrounds from '../components/Campgrounds.js'
import State from '../components/State.js'
import {connect} from 'react-redux'
import { setAllParks } from '../redux/actions/placesActions';

const HomeContainer = (props) => {

  const getParks = (props) => {
    fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
    .then(resp => resp.json())
    .then(parks => props.setAllParks(parks.data))
  }

  return (
    <div className="homeContainer">
      {getParks(props)}

      {props.state.placesReducer.parks 
      ?
        <>
          < HomeForm />  
          < Map />
        </>
      : null
      }
      {/* < Campgrounds /> */}
      {/* < State /> */}
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
      setAllParks: (parks) => dispatch(setAllParks(parks))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)