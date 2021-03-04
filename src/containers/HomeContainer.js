import React from 'react'
import Map from '../components/Map.js'
import HomeForm from '../components/HomeForm'
import Campgrounds from '../components/Campgrounds.js'
import State from '../components/State.js'
import {connect} from 'react-redux'
import { setAllParks } from '../redux/actions/placesActions'
import Slider from '../slider/Slider'

const images = [
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'
]

class HomeContainer extends React.Component {

  componentDidMount() {
    fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
    .then(resp => resp.json())
    .then(parks => this.props.setAllParks(parks.data))
  }

  render () {
    return (
      <div className="homeContainer">
        
      < Slider slides={images}/>
        {/* {this.props.state.placesReducer.parks 
        ?
          <>
            < HomeForm />  
            < Map />
          </>
        : null
        } */}
        {/* < Campgrounds /> */}
        {/* < State /> */}
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
      setAllParks: (parks) => dispatch(setAllParks(parks))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)