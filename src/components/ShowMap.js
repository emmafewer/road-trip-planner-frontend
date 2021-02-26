import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import { setFilteredParks } from '../redux/actions/placesActions';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

class ShowMap extends React.Component {

    getMap() {
        const { parks } = this.props.state.placesReducer
        const midLat = (parks.map(park => parseFloat(park.latitude)).reduce((a, b) => a + b, 0))/(parks.length)
        const midLong = (parks.map(park => parseFloat(park.longitude)).reduce((a, b) => a + b, 0))/(parks.length)

        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/emfewer/cklh3qovi01ot18skytaidnws',
            zoom: 5,
            center: [midLong, midLat],
            scrollZoom: true,
        });

        this.getParkMarkers(map)
    }

    getParkMarkers = (map) => {
        const { parks } = this.props.state.placesReducer
        
        map.on('load', () => {
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
        })

    }

    render () {
        return (
            <div className="showMap">
                <div id="map" style={{width: "55vh", height: "50vh"}}>
                    {this.props.state.placesReducer.parks !== undefined 
                    && this.getMap()
                    }
                </div>
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