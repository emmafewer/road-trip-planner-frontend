import React from 'react'
import SidePanel from '../components/SidePanel'
import ShowMap from '../components/ShowMap'
import {connect} from 'react-redux'
import { setFilteredParks } from '../redux/actions/placesActions';

class ShowContainer extends React.Component {
    
    componentDidMount() {
        if (this.props.state.placesReducer.area) {
            fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
            .then(resp => resp.json())
            .then(parks => {
                this.specifyArea(parks)
            })
        }
    }

    specifyArea = (parks) => {
        let startLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].latitude)
        let startLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].longitude)

        let endLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].latitude)
        let endLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].longitude)

        let lowLat = (Math.min(startLat, endLat)-3).toString()
        let highLat = (Math.max(startLat, endLat)+3).toString()
        let lowLong = (Math.min(startLong, endLong)-3).toString()
        let highLong = (Math.max(startLong, endLong)+3).toString()

        let filteredParks = parks.data.filter(park => park.latitude >= lowLat && park.latitude <= highLat && park.longitude <= lowLong && park.longitude >= highLong)
        this.props.setFilteredParks(filteredParks)
    }

    render () {
        return (
            <div className="showContainer">
                { this.props.state.placesReducer.area
                ? 
                <div> {this.props.state.placesReducer.parks ?
                    <div>
                        < SidePanel />
                        < ShowMap />
                    </div> :
                    null
                } </div> :
                null
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
        setFilteredParks: (parks) => dispatch(setFilteredParks(parks))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)