import React from 'react'

const ParkSideCard = (props) => {
    console.log(props.park)
    debugger
    return (
      <div className="parkSideCard">
          <h1>{props.park.fullName}</h1>
      </div>
    );
}
  
export default ParkSideCard