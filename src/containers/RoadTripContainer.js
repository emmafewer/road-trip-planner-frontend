import React from 'react'
import {connect} from 'react-redux'
import RSidePanel from '../roadtrip/RSidePanel'
import RMapNavBar from '../roadtrip/RMapNavBar'
import RShowMap from '../roadtrip/RShowMap'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { roadTripDates } from '../redux/actions/roadTripActions';


const BASE_URL = 'http://localhost:4000'

class ShowContainer extends React.Component {

    patchRoadTrip = (e) => {
        e.preventDefault()

        if (this.props.state.roadTripReducer.dates) {
            fetch(`${BASE_URL}/road_trips/${this.props.state.roadTripReducer.trip.id}`,{
                method: 'PATCH',
                headers : {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`}, 
                body: JSON.stringify({start_date: this.props.state.roadTripReducer.dates.start, end_date: this.props.state.roadTripReducer.dates.end})
              })
              .then(res => res.json())
              .then(console.log)
        }
    }
    // setTrip

    checkForDates = () => {
        if (this.props.state.roadTripReducer.trip.start_date && this.props.state.roadTripReducer.trip.end_date) {
            return this.props.state.roadTripReducer.trip.start_date - this.props.state.roadTripReducer.trip.end_date
        } else {
            return (
                <form noValidate autoComplete="off" onSubmit={this.patchRoadTrip}>
                  <TextField 
                    size="small" 
                    id="start" 
                    name="dates"
                    label="Start Date" 
                    variant="outlined"
                    style={{backgroundColor: "white"}}
                    onChange={this.props.roadTripDates}
                  />
                  <TextField 
                    size="small" 
                    id="end" 
                    name="dates"
                    label="End Date" 
                    variant="outlined" 
                    style={{backgroundColor: "white"}}
                    onChange={this.props.roadTripDates}
                  />
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    type="submit"
                  >View Places</Button>
                  
                </form>
            )
        }
    }

    render () {
        return (
            <div className="roadTripContainer">
                {this.props.state.roadTripReducer.trip 
                &&
                <>
                    <h1 style={{textAlign: "center"}}>{this.props.state.roadTripReducer.trip.name} {this.checkForDates()}</h1>
                    < RSidePanel />
                    <div className="rMapContainer">
                        < RMapNavBar />
                        < RShowMap />
                    </div>
                </>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        roadTripDates: (dates) => dispatch(roadTripDates(dates)),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)