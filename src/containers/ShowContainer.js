import React from 'react'
import SidePanel from '../components/SidePanel'
import MapContainer from './MapContainer'
import {connect} from 'react-redux'
import { setFilteredParks } from '../redux/actions/placesActions'
import { CircularProgress } from '@material-ui/core'

const BASE_URL = 'http://localhost:4000'

class ShowContainer extends React.Component {
    
    componentDidMount() {
        if (this.props.state.placesReducer.area) {
            fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
            .then(resp => resp.json())
            .then(parks => this.getCampgrounds(parks))
        }
    }

    getCampgrounds = (parks) => {
        fetch("https://developer.nps.gov/api/v1/campgrounds?limit=600&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
          .then(res => res.json())
          .then(campgrounds => this.specifyArea(parks, campgrounds))
    }

    specifyArea = (parks, campgrounds) => {
        let startLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].latitude)
        let startLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].longitude)

        let endLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].latitude)
        let endLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].longitude)

        let lowLat = (Math.min(startLat, endLat)-3).toString()
        let highLat = (Math.max(startLat, endLat)+3).toString()
        let lowLong = (Math.min(startLong, endLong)-3).toString()
        let highLong = (Math.max(startLong, endLong)+3).toString()

        let filteredParks = parks.data.filter(park => park.latitude >= lowLat && park.latitude <= highLat && park.longitude <= lowLong && park.longitude >= highLong)
        let filteredParkCodes = filteredParks.map(park => park.parkCode)
        let filteredCampgrounds = campgrounds.data.filter(camp => filteredParkCodes.includes(camp.parkCode))

    
        this.props.setFilteredParks({parks: filteredParks, campgrounds: filteredCampgrounds})
    }

    render () {
        return (
            <div className="showContainer">
                { this.props.state.placesReducer.area
                ? 
                <div> {this.props.state.placesReducer.places !== "" ?
                    <div>
                        < SidePanel />
                        < MapContainer />
                    </div> :
                    null
                } </div> :
                <CircularProgress style={{color: "white"}}/>
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
        setFilteredParks: (places) => dispatch(setFilteredParks(places))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)