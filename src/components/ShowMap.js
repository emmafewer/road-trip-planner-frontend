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
        })
    }

    specifyArea = (parks, map) => {
        let startLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].latitude)
        let startLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.start)[0].longitude)

        let endLat = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].latitude)
        let endLong = parseInt(parks.data.filter(park => park.fullName === this.props.state.placesReducer.area.end)[0].longitude)

        let lowLat = (Math.min(startLat, endLat)-3).toString()
        let highLat = (Math.max(startLat, endLat)+3).toString()
        let lowLong = (Math.min(startLong, endLong)-3).toString()
        let highLong = (Math.max(startLong, endLong)+3).toString()

        let filteredParks = parks.data.filter(park => park.latitude >= lowLat && park.latitude <= highLat && park.longitude <= lowLong && park.longitude >= highLong)
        
        const center = new mapboxgl.LngLat(((startLong+endLong)/2),((startLat+endLat)/2))
        map.setCenter(center)
        map.setZoom(5)
        
        this.getParkMarkers(filteredParks, map)
    }

    getParkMarkers = (parks, map) => {
        const features = []

        parks.forEach( park => {
            let feature = {
                'type' : 'Feature',
                'geometry' : {
                    'type' : 'Point',
                    'coordinates' : [ park.longitude, park.latitude ]
                },
                'properties' : {
                    'name' : park.fullName,
                    'description' : park.description
                }
            }
            features.push(feature)
        })

        map.addSource("locations", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        })

        features.forEach(marker => {

            const popup = new mapboxgl.Popup()
                .setHTML('<div style="padding:0.3rem 0.3rem 0;text-align:center; color: black;">'
                + '<h2 style="font-size:16px;margin:0 0 0.3rem;">' + marker.properties.name + '</h2>'
                + '<p style="font-size:12px;margin:0;">Description: ' + marker.properties.description + '</p></div>')
          

            new mapboxgl.Marker()
                .setLngLat(marker.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
        });

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