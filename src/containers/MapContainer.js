import React from 'react'
import ShowMap from '../components/ShowMap'
import MapNavBar from '../components/MapNavBar'
import {connect} from 'react-redux'


const MapContainer = () => {
    return (
        <div className="mapContainer">
            < MapNavBar />
            < ShowMap />
        </div>
    )
}

export default MapContainer