import React from 'react'
import {connect} from 'react-redux'
import RSidePanel from '../roadtrip/RSidePanel'
import RMapNavBar from '../roadtrip/RMapNavBar'
import RShowMap from '../roadtrip/RShowMap'



class ShowContainer extends React.Component {


    render () {
        return (
            <div className="roadTripContainer">
                {this.props.state.roadTripReducer.trip 
                &&
                <>
                    < RSidePanel />
                    <div className="rMapContainer">
                        < RMapNavBar />
                        {/* < RShowMap /> */}
                    </div>
                </>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
export default connect(mapStateToProps)(ShowContainer)