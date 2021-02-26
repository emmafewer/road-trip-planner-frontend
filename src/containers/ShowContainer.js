import React from 'react'
import {connect} from 'react-redux'

class ShowContainer extends React.Component {

    componentDidMount() {
        
    }

    render () {
        return (
            <div className="showContainer">
                <h1>You made it!!</h1>
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