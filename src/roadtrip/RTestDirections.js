import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

// big hole
// "latitude": "45.64647324",
// "longitude": "-113.6458443",

// fort union trading post
// "latitude": "48.00075828",
// "longitude": "-104.0375238",

// glacier
// "latitude": "48.68414678",
// "longitude": "-113.8009306",


// grant kohrs ranch
// "latitude": "46.41358923",
// "longitude": "-112.7467024",

const startLocation = [-113.6458443, 45.64647324]

const orders = {
    type: "FeatureCollection",
    features: [{
      type: 'Feature',
      properties: {
        address: 'Start location',
        accepted: 'home'
      },
      geometry: {
        type: 'Point',
        coordinates: startLocation
      }
    }, {
        type: 'Feature',
        properties: {
          address: 'Fort Union',
          accepted: true
        },
        geometry: {
          type: 'Point',
          coordinates: [-104.0375238, 48.00075828]
        }
      }, 
      {
        type: 'Feature',
        properties: {
          address: 'Glacier',
          accepted: true
        },
        geometry: {
          type: 'Point',
          coordinates: [-113.8009306, 48.68414678]
        }
      },
      {
        type: 'Feature',
        properties: {
          address: 'Grant Kohrs Ranch',
          accepted: true
        },
        geometry: {
          type: 'Point',
          coordinates: [-112.7467024, 46.41358923]
        }
      }
    ]
}

class RTestDirections extends React.Component {

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: startLocation,
            zoom: 5,
            // transformRequest: transformRequest
        });

        this.handleMap(map)
    }

    setTripLine = function(trip, map) {
        const routeLine = {
          type: 'FeatureCollection',
          features: [{
            properties: {},
            geometry: trip.geometry,
          }],
        };
    
        map.getSource('route').setData(routeLine); 
        

      }
    
    setStops = function(stops, map) {
        const deliveries = {
          type: 'FeatureCollection',
          features: [
          ],
        };
    
        stops.forEach((stop) => {
          const delivery = {
                        properties: {
                            name: stop.name,
                            stop_number: stop.waypoint_index
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: stop.location,
                        },
                    };
            deliveries.features.push(delivery);
        });
        map.getSource('deliveries').setData(deliveries);
    }

    getDeliveryRoute = (map) => {

        const deliverable = orders.features.filter(point => point.properties.accepted);
        // Once there are 2 deliveries, get the delivery route
        if (deliverable.length > 2) {
            const coords = [];
            
            deliverable.forEach((delivery) => {
              coords.push(delivery.geometry.coordinates.join(','));
            });
            const approachParam = ';curb';
            let optimizeUrl = 'https://api.mapbox.com/optimized-trips/v1/';
            optimizeUrl += 'mapbox/driving-traffic/';
            optimizeUrl += coords.join(';');
            optimizeUrl += '?access_token=' + mapboxgl.accessToken;
            optimizeUrl += '&geometries=geojson&overview=full&steps=false';
            optimizeUrl += '&approaches=' + approachParam.repeat(coords.length - 1);
            
            // To inspect the response in the browser, remove for production
            console.log(optimizeUrl);
            
            fetch(optimizeUrl).then((res) => res.json()).then((res) => {
              // Add the original address text to the waypoints
            //   res.waypoints.forEach((waypoint, i) => {
            //     waypoint.address = waypoint[i] == 0 ? 'Start' : deliverable[i].properties.address;
            //   });
    
            // Add the distance, duration, and turn-by-turn instructions to the sidebar
            // setOverview(res);
    
            // Draw the route and stops on the map
            this.setTripLine(res.trips[0], map);
            this.setStops(res.waypoints, map);
          })
        }
    }

    handleMap = (map) => {
        map.on("load", () => {

            map.addSource("orders", {
                type: "geojson",
                data: orders
            });

            map.addLayer({
                "id": "ordersLayer",
                "type": "circle",
                "source": "orders",
                "layout": {},
                "paint": {
                  "circle-radius": 10,
                  "circle-color": [
                    'case', 
                    ['get', 'accepted'],
                    'blue',
                    ['==', ['get', 'accepted'], 'home'],
                    'black',
                    'red'
                  ]
                }
            }, "road-label");

            map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                  ],
                },
              });
          
            map.addLayer({
                id: 'routeLayer',
                type: 'line',
                source: 'route',
                layout: {},
                paint: {
                  'line-color': 'cornflowerblue',
                  'line-width': 10,
                },
              }, 'road-label');

              map.addSource("deliveries", {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                  ]
                }
              });
          
              map.addLayer({
                "id": "deliveriesLayer",
                "type": "circle",
                "source": "deliveries",
                "layout": {},
                "paint": {
                  "circle-color": 'white',
                  "circle-stroke-color": '#444',
                  "circle-radius": 18
                }
              }, "road-label");
          
              map.addLayer({
                "id": "deliveriesLabels",
                "type": "symbol",
                "source": "deliveries",
                "layout": {
                  'text-field': ['get', 'stop_number']
                },
                "paint": {
                  "text-color": '#444'
                }
              });

            map.getSource('orders').setData(orders)
            this.getDeliveryRoute(map)
        })
    }

    // setOverview = function(route) {
    //     const trip = route.trips[0];
    //     const waypoints = route.waypoints;
    //     // Set some basic stats for the route in the sidebar
    //     titleText.innerText = `${(trip.distance / 1609.344).toFixed(1)} miles | ${(trip.duration / 60).toFixed(0)} minutes`;
    //     addressList.innerText = '';
    
    //     // Add the delivery addresses and turn-by-turn instructions to the sidebar for each leg of the trip
    //     trip.legs.forEach((leg, i) => {
    //       const listItem = document.createElement('li');
    //       // We want the destination address when we depart, hence index + 1
    //       if (i < trip.legs.length - 1) {
    //         const nextDelivery = waypoints.find( ({waypoint_index}) => waypoint_index === i + 1);
    //         console.log(nextDelivery);
    //         listItem.innerHTML = `<b>Deliver to: ${nextDelivery.address}</b>`;
    //       } else {
    //         // We're outside the range of deliveries, so let's go home
    //         listItem.innerHTML = `<b>Return to store</b>`;
    //       }
    //       addressList.appendChild(listItem);
    //       // add the TBT instructions for this leg
    //       leg.steps.forEach((step) => {
    //         const listItem = document.createElement('li');
    //                 listItem.innerText = step.maneuver.instruction;
    //                 addressList.appendChild(listItem);
    //       });
    //     });
    // }

    render() {
        return (
            <div id="map">

            </div>
        )
    }

}

export default RTestDirections