import React from 'react'
import RoadTripCard from './RoadTripCard'
import {connect} from 'react-redux'
import { setRoadTripList } from '../redux/actions/roadTripActions';

const BASE_URL = 'http://localhost:4000'

class MyRoadTrips extends React.Component {

    componentDidMount() {
        if (this.props.state.userReducer.user.id !== undefined) {
            fetch(`${BASE_URL}/users/${this.props.state.userReducer.user.id}`,{
                method: 'GET',
                headers : {
                    'content-type':'application/json', 
                    Authorization: `Bearer ${localStorage.token}`}, 
              })
              .then(res => res.json())
              .then(user => this.props.setRoadTripList(user.road_trips))
        }
    }

    render () {
        return (
            <div>
                <h2 id="myRoadTripsTitle">{this.props.state.userReducer.user.name}'s Road Trips</h2>
                <div className="myRoadTrips">
                    {this.props.state.roadTripReducer.trips
                    && 
                    this.props.state.roadTripReducer.trips.map(trip => <RoadTripCard trip={trip}/>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setRoadTripList: (trips) => dispatch(setRoadTripList(trips))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MyRoadTrips)