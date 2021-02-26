import React from 'react'
import SidePanel from '../components/SidePanel'
import ShowMap from '../components/ShowMap'

function ShowContainer() {
    return (
      <div className="showContainer">
          < SidePanel />
          < ShowMap />
      </div>
    );
  }
  
export default ShowContainer;