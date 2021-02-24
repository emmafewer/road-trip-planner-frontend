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
    fetch("https://ridb.recreation.gov/api/v1/campsites?limit=50&offset=0&apikey=70aa9b04-78cd-4c00-8694-7955bd9d1bfc")
    .then(resp => resp.json())
    .then(console.log)
    }
  
    getCampMarkers = (camps, map) => {
        const features = []

        camps.data.forEach( camp => {
         
            let feature = {
                'type' : 'Feature',
                'geometry' : {
                    'type' : 'Point',
                    'coordinates' : [ camp.longitude, camp.latitude ]
                },
                'properties' : {
                    'name' : camp.CampsiteName,
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
                + '<h2 style="font-size:16px;margin:0 0 0.3rem;">' + marker.properties.name + '</h2></div>')
          

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