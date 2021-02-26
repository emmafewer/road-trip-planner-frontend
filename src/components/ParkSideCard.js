import React from 'react'

const ParkSideCard = (props) => {
    console.log(props.park)

    return (
      <div className="parkSideCard">
          <p>{props.park.fullName}</p>
      </div>
    );
}
  
export default ParkSideCard