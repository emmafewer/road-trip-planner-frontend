import React from 'react'
import {connect} from 'react-redux'
import RSidePanel from '../roadtrip/RSidePanel'
import RMapContainer from '../roadtrip/RMapContainer'



class ShowContainer extends React.Component {


    render () {
        return (
            <div className="roadTripContainer">
                {this.props.state.roadTripReducer.trip 
                &&
                <>
                    < RSidePanel />
                    < RMapContainer />
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