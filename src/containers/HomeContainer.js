import React from 'react'
import Map from '../components/Map.js'
import HomeForm from '../components/HomeForm'
import Campgrounds from '../components/Campgrounds.js'
import State from '../components/State.js'

function HomeContainer() {
    return (
      <div className="homeContainer">
        < HomeForm />  
        < Map />
        {/* < Campgrounds /> */}
        {/* < State /> */}
      </div>
    );
  }
  
export default HomeContainer;