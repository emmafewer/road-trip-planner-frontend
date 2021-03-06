import React from 'react'
import {connect} from 'react-redux'
import RSidePanel from '../roadtrip/RSidePanel'
import RMapNavBar from '../roadtrip/RMapNavBar'
import RShowMap from '../roadtrip/RShowMap'
import { setTrip, joinPlaces } from '../redux/actions/roadTripActions'
import { DateRangePicker } from 'react-dates'
import RTestDirections from '../roadtrip/RTestDirections'
import { CircularProgress, Button} from '@material-ui/core'


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

    setPlaces = () => {
        if (this.props.state.roadTripReducer.trip) {
            let campgrounds = this.props.state.roadTripReducer.trip.campgrounds
            let parks = this.props.state.roadTripReducer.trip.parks
            let places = campgrounds.concat(parks)
            this.props.joinPlaces(places)
        }
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
                    {/* <Button 
                        variant="outlined" 
                        color="default"
                        style={{display: 'inline-flex'}}
                    >Edit Dates
                    </Button> */}
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
                    {this.state.startDate && this.state.endDate &&
                        <Button 
                            variant="outlined" 
                            color="default"
                            type="submit"
                        >Set Dates</Button>
                    }
                  
                </form>
            )
        }
    }

    render () {
        return (
            <div className="roadTripContainer">
                {this.props.state.roadTripReducer.places.length > 0 ? null : this.setPlaces()}

                {this.props.state.roadTripReducer.trip !== ""
                ?
                <>
                < RSidePanel />
                    <h1 style={{paddingTop: "60px", textAlign: "center", paddingRight: "100px"}}>{this.props.state.roadTripReducer.trip.name} {this.checkForDates()}</h1>
                    
                    <div className="rMapContainer">
                        < RMapNavBar />
                        {this.props.state.roadTripReducer.show === "Map"
                        ? < RShowMap /> 
                        : < RTestDirections />
                        }
                     
                    </div>
                </>
                : <CircularProgress style={{color: "white", alignItems: "center", verticalAlign: "middle", position: "relative"}}/>
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
        setTrip: (trip) => dispatch(setTrip(trip)),
        joinPlaces: (places) => dispatch(joinPlaces(places)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RoadTripContainer)