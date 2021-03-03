import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'
let map

class RTestMap extends React.Component {

    componentDidMount() {
        if (this.props.state.roadTripReducer.trip) {
            const { parks } = this.props.state.roadTripReducer.trip
            const midLat = (parks.map(park => parseFloat(park.latitude)).reduce((a, b) => a + b, 0))/(parks.length)
            const midLong = (parks.map(park => parseFloat(park.longitude)).reduce((a, b) => a + b, 0))/(parks.length)
    
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/emfewer/cklh3qovi01ot18skytaidnws',
                zoom: 5,
                center: [midLong, midLat],
                scrollZoom: true,
            });
    
            this.getParkMarkers(map)
        }
    }

    createPopUp = (currentFeature) => {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
      
        var popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>Sweetgreen</h3>' +
            '<h4>' + currentFeature.properties.name + '</h4>')
          .addTo(map);
      }


    buildLocationList = (data) => {
        data.forEach(function(store, i){
          /**
           * Create a shortcut for `store.properties`,
           * which will be used several times below.
          **/
          var prop = store.properties;
      
          /* Add a new listing section to the sidebar. */
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = "listing-" + data[i].properties.id;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';
      
          /* Add the link to the individual listing created above. */
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = "link-" + prop.id;
          link.innerHTML = prop.name;
      
          /* Add details to the individual listing. */
        //   var details = listing.appendChild(document.createElement('div'));
        //   details.innerHTML = prop.city;
        //   if (prop.phone) {
        //     details.innerHTML += ' · ' + prop.phoneFormatted;
        //   }
        //   if (prop.distance) {
        //     var roundedDistance = Math.round(prop.distance * 100) / 100;
        //     details.innerHTML +=
        //       '<p><strong>' + roundedDistance + ' miles away</strong></p>';
        //   }

          link.addEventListener('click', function(e){
            for (var i = 0; i < data.length; i++) {
              if (this.id === "link-" + data[i].properties.id) {
                var clickedListing = data[i];
                var popUps = document.getElementsByClassName('mapboxgl-popup');
                /** Check if there is already a popup on the map and if so, remove it */
                if (popUps[0]) popUps[0].remove();
              
                var popup = new mapboxgl.Popup({ closeOnClick: false })
                  .setLngLat(clickedListing.geometry.coordinates)
                  .setHTML('<h3>Sweetgreen</h3>' +
                    '<h4>' + clickedListing.properties.name + '</h4>')
                  .addTo(map);
              }
            }  
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });

        });
    }


    getParkMarkers = (map) => {
        const { parks, campgrounds } = this.props.state.roadTripReducer.trip
        
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
                        'description' : park.description
                    }
                }
                features.push(feature)
            })

            features.forEach(function(feature, i){
               feature.properties.id = i
            })

                /* Add the data to your map as a layer */
                // map.addLayer({
                //   "id": "locations",
                //   "type": "circle",
                //   /* Add a GeoJSON source containing place coordinates and information. */
                //   "source": {
                //     "type": "geojson",
                //     "data": {"features": features}
                //   }
                // });

            map.addSource("locations", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": features
                }, 
                "generateId": true
            })
debugger
            map.addLayer({
                'id': 'earthquakes-viz',
                'type': 'circle',
                'source': 'locations',
                'paint': {
                    // 'circle-stroke-color': '#000',
                    // 'circle-stroke-width': 1,
                    // 'circle-color': '#000'
                    'circle-radius': [
                        'case',
                        ['boolean',
                          ['feature-state', 'hover'],
                          false
                        ],
                        [
                          'interpolate', ['linear'],
                          ['get', 'mag'],
                          1, 8,
                          1.5, 10,
                          2, 12,
                          2.5, 14,
                          3, 16,
                          3.5, 18,
                          4.5, 20,
                          6.5, 22,
                          8.5, 24,
                          10.5, 26
                        ],
                        5
                      ],
                      'circle-stroke-color': '#000',
                      'circle-stroke-width': 1,
                      // The feature-state dependent circle-color expression will render
                      // the color according to its magnitude when
                      // a feature's hover state is set to true
                      'circle-color': [
                        'case',
                        ['boolean',
                          ['feature-state', 'hover'],
                          false
                        ],
                        [
                          'interpolate', ['linear'],
                          ['get', 'mag'],
                          1, '#fff7ec',
                          1.5, '#fee8c8',
                          2, '#fdd49e',
                          2.5, '#fdbb84',
                          3, '#fc8d59',
                          3.5, '#ef6548',
                          4.5, '#d7301f',
                          6.5, '#b30000',
                          8.5, '#7f0000',
                          10.5, '#000'
                        ],
                        '#000'
                      ]
                }
              });


              var quakeID = null;

map.on('mousemove', 'earthquakes-viz', (e) => {

  map.getCanvas().style.cursor = 'pointer';
  // Set variables equal to the current feature's magnitude, location, and time
  var quakeMagnitude = e.features[0].properties.mag;
  var quakeLocation = e.features[0].properties.place;
  var quakeDate = new Date(e.features[0].properties.time);

  // Check whether features exist
  if (e.features.length > 0) {
    // Display the magnitude, location, and time in the sidebar
    // magDisplay.textContent = quakeMagnitude;
    // locDisplay.textContent = quakeLocation;
    // dateDisplay.textContent = quakeDate;

    // If quakeID for the hovered feature is not null,
    // use removeFeatureState to reset to the default behavior
    if (quakeID) {
      map.removeFeatureState({
        source: "earthquakes",
        id: quakeID
      });
    }

    quakeID = e.features[0].id;

    // When the mouse moves over the earthquakes-viz layer, update the
    // feature state for the feature under the mouse
    map.setFeatureState({
      source: 'earthquakes',
      id: quakeID,
    }, {
      hover: true
    });

  }
});
            // features.forEach(marker => {

            //     const popup = new mapboxgl.Popup()
            //         .setHTML('<div style="padding:0.3rem 0.3rem 0;text-align:center; color: black;">'
            //         + '<h2 style="font-size:16px;margin:0 0 0.3rem;">' + marker.properties.name + '</h2>'
            //         + '<p style="font-size:12px;margin:0;">Description: ' + marker.properties.description + '</p></div>')
            

            //     new mapboxgl.Marker()
            //         .setLngLat(marker.geometry.coordinates)
            //         // .setPopup(popup)
            //         .addTo(map);
            // });

            map.on('click', function(e) {
                /* Determine if a feature in the "locations" layer exists at that point. */
                var features = map.queryRenderedFeatures(e.point, {
                  layers: ['locations']
                });
                
                /* If yes, then: */
                if (features.length) {
                  var clickedPoint = features[0];
                  
                  /* Close all other popups and display popup for clicked store */
                  this.createPopUp(clickedPoint);
                  
                  /* Highlight listing in sidebar (and remove highlight for all other listings) */
                  var activeItem = document.getElementsByClassName('active');
                  if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                  }
                  var listing = document.getElementById('listing-' + clickedPoint.properties.id);
                  listing.classList.add('active');
                }
            });

            this.buildLocationList(features)
        })

    }

    render () {
        return (
            <div >
                <div id="listings"></div>
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
  

export default connect(mapStateToProps)(RTestMap)