import React from 'react'
import {connect} from 'react-redux'
import RSidePanel from '../roadtrip/RSidePanel'
import RMapNavBar from '../roadtrip/RMapNavBar'
import RShowMap from '../roadtrip/RShowMap'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { roadTripDates, setTrip } from '../redux/actions/roadTripActions';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment'
import RTestMap from '../roadtrip/RTestMap'
import RTestDirections from '../roadtrip/RTestDirections'


const BASE_URL = 'http://localhost:4000'

class RoadTripContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          startDate: null,
          endDate: null,
          focusedInput: null,
        };
    }


    patchRoadTrip = (e) => {
        e.preventDefault()

        fetch(`${BASE_URL}/road_trips/${this.props.state.roadTripReducer.trip.id}`,{
            method: 'PATCH',
            headers : {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`}, 
            body: JSON.stringify({start_date: this.state.startDate, end_date: this.state.endDate})
            })
            .then(res => res.json())
            .then(trip => this.props.setTrip(trip))
    }

    checkForDates = () => {
        if (this.props.state.roadTripReducer.trip.start_date && this.props.state.roadTripReducer.trip.end_date) {
            return (
                <div >
                <h3>
                    {`${this.props.state.roadTripReducer.trip.start_date.split("T")[0].slice(5)}-${this.props.state.roadTripReducer.trip.start_date.split("T")[0].slice(0,4)} - ${this.props.state.roadTripReducer.trip.end_date.split("T")[0].slice(5)}-${this.props.state.roadTripReducer.trip.end_date.split("T")[0].slice(0,4)}   `}
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        style={{display: 'inline-flex'}}
                    >Edit Dates
                    </Button>
                </h3>
                {/* // <DayPickerRangeController
                //     startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                //     endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                //     onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                //     focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                //     onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                //     initialVisibleMonth={() => moment().add(2, "M")} // PropTypes.func or null,
                // /> */}

                </div>
            )
        } else {
            return (
                <form noValidate autoComplete="off" onSubmit={this.patchRoadTrip}>
                    <DateRangePicker
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                    />

                    <Button 
                        variant="outlined" 
                        color="secondary"
                        type="submit"
                    >Set Dates</Button>
                  
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
                        {/* < RShowMap /> */}
                        {/* <RTestMap /> */}
                        < RTestDirections />
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
        setTrip: (trip) => dispatch(setTrip(trip))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(RoadTripContainer)