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

    // createTripCards = (user) => {
    //     debugger
    //     user.road_trips.map(trip => <RoadTripCard trip={trip} />)
    // }

    render () {
        return (
            <div className="myRoadTrips">
                {this.props.state.roadTripReducer.trips
                && 
                this.props.state.roadTripReducer.trips.map(trip => <RoadTripCard trip={trip}/>)}
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