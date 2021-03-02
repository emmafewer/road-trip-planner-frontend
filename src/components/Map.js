import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'


class Map extends React.Component {

    componentDidMount() {
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/emfewer/cklh3qovi01ot18skytaidnws',
            zoom: 3,
            center: [-95.7129, 37.0902],
            scrollZoom: true,
        });
    // fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
    // .then(resp => resp.json())
    // .then(parks => {
    //     this.getParkMarkers(parks, map)
    //     })
        this.getParkMarkers(map)
    }

    getParkMarkers = (map) => {

        
        const { parks } = this.props.state.placesReducer
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

        map.on('load', function() {
        map.addSource("locations", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        })
    })

        // var hoveredStateId = null;
        //     map.addSource("states", {
        //         "type": "geojson",
        //         "data": 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
                // {
                //     "type": "FeatureCollection",
                //     "features": features
                // }
            // })

            // map.addLayer({
            //     'id': 'state-fills',
            //     'type': 'fill',
            //     'source': 'states',
            //     'layout': {},
            //     'paint': {
            //     'fill-color': '#627BC1',
            //     'fill-opacity': [
            //     'case',
            //     ['boolean', ['feature-state', 'hover'], false],
            //     1,
            //     0.5
            //     ]
            //     }
            //     });
                 
            //     map.addLayer({
            //     'id': 'state-borders',
            //     'type': 'line',
            //     'source': 'states',
            //     'layout': {},
            //     'paint': {
            //     'line-color': '#627BC1',
            //     'line-width': 2
            //     }
            //     });

                // map.on('mousemove', 'state-fills', function (e) {
                //     if (e.features.length > 0) {
                //     if (hoveredStateId) {
                //     map.setFeatureState(
                //     { source: 'states', id: hoveredStateId },
                //     { hover: false }
                //     );
                //     }
                //     hoveredStateId = e.features[0].id;
                //     map.setFeatureState(
                //     { source: 'states', id: hoveredStateId },
                //     { hover: true }
                //     );
                //     }
                //     });
                     
                    // When the mouse leaves the state-fill layer, update the feature state of the
                    // previously hovered feature.
                    // map.on('mouseleave', 'state-fills', function () {
                    // if (hoveredStateId) {
                    // map.setFeatureState(
                    // { source: 'states', id: hoveredStateId },
                    // { hover: false }
                    // );
                    // }
                    // hoveredStateId = null;
                    // });

        features.forEach(marker => {
            const popup = new mapboxgl.Popup()
                .setHTML('<div style="padding:0.3rem 0.3rem 0;text-align:center;">'
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
            <div id='map'></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
  }

export default connect(mapStateToProps)(Map)