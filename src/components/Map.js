import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';

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
    fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
    .then(resp => resp.json())
    .then(parks => this.getParkMarkers(parks, map))
    }

    getParkMarkers = (parks, map) => {
        const features = []

        parks.data.forEach( park => {
           
            let feature = {
                'type' : 'Feature',
                'geometry' : {
                    'type' : 'Point',
                    'coordinates' : [ park.longitude, park.latitude ]
                },
                'properties' : {
                    'name' : park.fullName,
                    'description' : park.description,
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

export default Map