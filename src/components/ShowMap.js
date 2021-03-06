import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import { setFeatures } from '../redux/actions/mapActions';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

class ShowMap extends React.Component {

    componentDidMount() {
        if (this.props.state.placesReducer.places !== "") {
            const { parks } = this.props.state.placesReducer.places
            const midLat = (parks.map(park => parseFloat(park.latitude)).reduce((a, b) => a + b, 0))/(parks.length)
            const midLong = (parks.map(park => parseFloat(park.longitude)).reduce((a, b) => a + b, 0))/(parks.length)
    
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/outdoors-v11',
                zoom: 5,
                center: [midLong, midLat],
                scrollZoom: true,
            });
            this.getParkMarkers(map)
        }
    }

    getParkMarkers = (map) => {
        const { parks, campgrounds } = this.props.state.placesReducer.places
        
        map.on('load', () => {
            const features = []
            campgrounds.forEach( park => {
                let feature = {
                    'type' : 'Feature',
                    'geometry' : {
                        'type' : 'Point',
                        'coordinates' : [ park.longitude, park.latitude ]
                    },
                    'properties' : {
                        'name' : park.name,
                        'description' : park.description,
                        'id': park.id
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
            // let testArr = []
            features.forEach(marker => {

                const popup = new mapboxgl.Popup()
                    .setHTML('<div style="padding:0.3rem 0.3rem 0;text-align:center; color: black;">'
                    + '<h2 style="font-size:16px;margin:0 0 0.3rem;">' + marker.properties.name + '</h2>'
                    + '<p style="font-size:12px;margin:0;">Description: ' + marker.properties.description + '</p></div>')
            

                // new mapboxgl.Marker()
                //     .setLngLat(marker.geometry.coordinates)
                //     .setPopup(popup)
                //     .addTo(map);
                
                const div = document.createElement('div')
                div.className = 'biggerMarker'  
            
                new mapboxgl.Marker(div)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map);

            })
            // this.props.setFeatures(testArr)
        })

    }

    render () {
        return (
            <div >
                <div id="map" style={{maxHeight: '100%', maxWidth: '100%'}}></div>
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
        setFeatures: (features) => dispatch(setFeatures(features)),
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(ShowMap)