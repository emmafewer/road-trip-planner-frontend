import React from 'react'
import {connect} from 'react-redux'
import RListItem from './RListItem'

const generateList = (props) => {
  let campgrounds = props.state.roadTripReducer.trip.campgrounds
  let parks = props.state.roadTripReducer.trip.parks
  let places = campgrounds.concat(parks)
  return (places.map(place => < RListItem place={place} />))
}

const RList= (props) => {
  
    return (
      <div className="fullList">
        {props.state.roadTripReducer.trip 
        && generateList(props)
        }
      </div>
    )
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

export default connect(mapStateToProps)(RList)