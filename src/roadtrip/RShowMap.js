import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

class RShowMap extends React.Component {

    componentDidMount() {
        if (this.props.state.roadTripReducer.places) {
            const { places } = this.props.state.roadTripReducer
            const midLat = (places.map(place => parseFloat(place.latitude)).reduce((a, b) => a + b, 0))/(places.length)
            const midLong = (places.map(place => parseFloat(place.longitude)).reduce((a, b) => a + b, 0))/(places.length)
    
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
        const { places } = this.props.state.roadTripReducer
        
        map.on('load', () => {
            const features = []
            places.forEach( park => {
                let feature = {
                    'type' : 'Feature',
                    'geometry' : {
                        'type' : 'Point',
                        'coordinates' : [ park.longitude, park.latitude ]
                    },
                    'properties' : {
                        'name' : park.name,
                        'description' : park.description,
                        'designation' : park.designation
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
            
               
                if (marker.properties.designation !== undefined) {
                    const div = document.createElement('div')
                    div.className = 'treeMarker' 
                    new mapboxgl.Marker(div)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map); 
                } else {
                    const div = document.createElement('div')
                    div.className = 'tentMarker' 
                    new mapboxgl.Marker(div)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map);
                }

            });
        })

    }

    render () {
        return (
            <div >
                <div id="map" style={{maxHeight: '100%', maxWidth: '100%'}}>
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
  

export default connect(mapStateToProps)(RShowMap)