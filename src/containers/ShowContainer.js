import React from 'react'
import SidePanel from '../components/SidePanel'
import ShowMap from '../components/ShowMap'
import {connect} from 'react-redux'
import { setFilteredParks } from '../redux/actions/placesActions';

class ShowContainer extends React.Component {
    
    componentDidMount() {
        // let map = new mapboxgl.Map({
        //     container: 'map',
        //     style: 'mapbox://styles/emfewer/cklh3qovi01ot18skytaidnws',
        //     zoom: 3,
        //     center: [-95.7129, 37.0902],
        //     scrollZoom: true,
        // });

        fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
        .then(resp => resp.json())
        .then(parks => {
            // this.specifyArea(parks, map)
            this.props.setFilteredParks(parks)
        })
    }

    render () {
        return (
            <div className="showContainer">
                < SidePanel />
                < ShowMap />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        setFilteredParks: (parks) => dispatch(setFilteredParks(parks))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)