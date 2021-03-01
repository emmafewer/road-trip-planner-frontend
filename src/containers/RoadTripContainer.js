import React from 'react'
import {connect} from 'react-redux'


const BASE_URL = 'http://localhost:4000'

class ShowContainer extends React.Component {
    


    render () {
        return (
            <div className="roadTripContainer">

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