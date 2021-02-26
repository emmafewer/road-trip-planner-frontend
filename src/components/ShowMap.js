import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

class ShowMap extends React.Component {

    componentDidMount() {
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/emfewer/cklh3qovi01ot18skytaidnws',
            zoom: 3,
            center: [-95.7129, 37.0902],
            scrollZoom: true,
        });
        fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
        .then(resp => resp.json())
        .then(parks => {
            this.specifyArea(parks, map)
            // this.getParkMarkers(parks, map)
        })
    }

    specifyArea = (parks, map) => {
        console.log(this.props.state.placesReducer.area)
        let startLat = parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].latitude
        let startLong = parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].longitude

        let endLat = parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].latitude
        let endLong = parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].longitude

        let filter = parks.data.filter(park => park.latitude >= endLat && park.latitude <= startLat && park.longitude >= endLong && park.longitude <= startLong)
        debugger
        // Want to find lat and long of start and end then store in state.  
        // Then we will filter places whose longitudes are between start and end 
        // AND latitudes are between start and end
        // Will need to find min and max
    }

    render () {
        return (
            <div id="map">
            </div>
        );
    }
}
  
const mapStateToProps = state => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(ShowMap)