import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {connect} from 'react-redux'
import { joinPlaces, setTotal } from '../redux/actions/roadTripActions'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw'

class RTestDirections extends React.Component {

    componentDidMount() {

        const { places } = this.props.state.roadTripReducer
    
        const orders = {
            type: "FeatureCollection",
            features: [],
        }
        
        places.forEach( place => {
            let feature = {
                'type' : 'Feature',
                'geometry' : {
                    'type' : 'Point',
                    'coordinates' : [ place.longitude, place.latitude ]
                },
                'properties' : {
                    'name' : place.name,
                    'description' : place.description
                }
            }
            orders.features.push(feature)
        })

        const midLat = (places.map(place => parseFloat(place.latitude)).reduce((a, b) => a + b, 0))/(places.length)
        const midLong = (places.map(place => parseFloat(place.longitude)).reduce((a, b) => a + b, 0))/(places.length)

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [midLong, midLat],
            zoom: 5,
        });

        this.handleMap(map, orders)
    }

    updatePlacesProps = (res) => {
        let waypoints = res.waypoints
        let trip = res.trips[0]
        let orderedArray = []
        waypoints.forEach(point => {
            let newPlace = {}
            this.props.state.roadTripReducer.places.forEach(place => {
                if (point.name === place.name) {
                    if (trip.legs[point.waypoint_index] === undefined) {
                      newPlace = {order: point.waypoint_index, distance: null, duration: null, ...place}
                      orderedArray.push(newPlace)
                    } else {
                      newPlace = {order: point.waypoint_index, distance: (trip.legs[point.waypoint_index].distance / 1609.344).toFixed(1), duration: (trip.legs[point.waypoint_index].duration / 60).toFixed(0), ...place}
                      orderedArray.push(newPlace)
                    }
                }
            })
        })
        this.props.joinPlaces(orderedArray)
        // titleText = `${(trip.distance / 1609.344).toFixed(1)} miles |
        //  ${(trip.duration / 60).toFixed(0)} minutes`
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

    getDeliveryRoute = (map, orders) => {
        const deliverable = orders.features
       
        let round_trip = true
        if (this.props.state.mapReducer.routeType === "One-Way") {
          round_trip = false
        }

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
            optimizeUrl += '&source=first&destination=last'
            optimizeUrl += '&roundtrip=' + round_trip;
            
            
            // To inspect the response in the browser, remove for production
            // console.log(optimizeUrl);
            
            fetch(optimizeUrl).then((res) => res.json()).then((res) => {
              // Add the original address text to the waypoints
              // debugger
              res.waypoints.forEach((waypoint, i) => {
                waypoint.name = waypoint[i] == 0 ? 'Start' : deliverable[i].properties.name;
              });
    
            // Add the distance, duration, and turn-by-turn instructions to the sidebar
            this.setOverview(res)
    
            // Draw the route and stops on the map
            this.setTripLine(res.trips[0], map);
            this.setStops(res.waypoints, map);
            this.updatePlacesProps(res)
          })
        }
    }

    handleMap = (map, orders) => {
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
            this.getDeliveryRoute(map, orders)
        })
    }

    setOverview = function(route) {
        const trip = route.trips[0];
        // const waypoints = route.waypoints;
        // Set some basic stats for the route in the sidebar
        // titleText = `${(trip.distance / 1609.344).toFixed(1)} miles | ${(trip.duration / 60).toFixed(0)} minutes`
        // addressList.innerText = '';
        let totalDist = (trip.distance / 1609.344).toFixed(1)
        let totalDur = (trip.duration / 60 / 60).toFixed(0)
        this.props.setTotal({totalDistance: totalDist, totalDuration: totalDur})

        // trip.legs.forEach((leg, i) => {

        // })
        // Add the delivery addresses and turn-by-turn instructions to the sidebar for each leg of the trip
        // trip.legs.forEach((leg, i) => {
        //   const listItem = document.createElement('li');
          // We want the destination address when we depart, hence index + 1
        //   if (i < trip.legs.length - 1) {
        //     const nextDelivery = waypoints.find( ({waypoint_index}) => waypoint_index === i + 1);
        //     console.log(nextDelivery);
        //     listItem.innerHTML = `<b>Deliver to: ${nextDelivery.address}</b>`;
        //   } else {
            // We're outside the range of deliveries, so let's go home
        //     listItem.innerHTML = `<b>Return to store</b>`;
        //   }
        //   addressList.appendChild(listItem);
          // add the TBT instructions for this leg
        //   leg.steps.forEach((step) => {
        //     const listItem = document.createElement('li');
        //             listItem.innerText = step.maneuver.instruction;
        //             addressList.appendChild(listItem);
        //   });
        // });
    }

    render() {
        return (
          <>
            {this.props.state.roadTripReducer.places[0].name === this.props.state.mapReducer.start &&
              <div id="map"></div>
            }
          </>
        )
    }

}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinPlaces: (places) => dispatch(joinPlaces(places)),
        setTotal: (total) => dispatch(setTotal(total))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RTestDirections)