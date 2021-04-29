import React from 'react'
import Map from '../components/Map.js'
import HomeForm from '../components/HomeForm'
import {connect} from 'react-redux'
import { setAllParks } from '../redux/actions/placesActions'
import { CircularProgress } from '@material-ui/core'

const images = [
  // 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  // 'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  // 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  // 'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'

  // "https://www.nps.gov/common/uploads/structured_data/3C7B4A95-1DD8-B71B-0B8C1868A4135836.jpg", "https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7C7416-1DD8-B71B-0B1B30D0827F7C74.jpg", "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7B477B-1DD8-B71B-0BCB48E009241BAA.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7C7A77-1DD8-B71B-0BDA92321AD899C5.jpg"
  "https://www.nps.gov/common/uploads/structured_data/3C82ED5D-1DD8-B71B-0B2F33D3B39D6D1B.jpg", "https://www.nps.gov/common/uploads/structured_data/3C82EBFE-1DD8-B71B-0B21072718DB2A95.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7A0B2B-1DD8-B71B-0BE0E26B0740AA6B.jpg", "https://www.nps.gov/common/uploads/structured_data/3C82EBFE-1DD8-B71B-0B21072718DB2A95.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7A0DE5-1DD8-B71B-0BFBE720788EF4A3.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7A0C49-1DD8-B71B-0B460D58D6E83B40.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7B4BEC-1DD8-B71B-0B2CF833F93140FF.jpg", "https://www.nps.gov/common/uploads/structured_data/3C82EE63-1DD8-B71B-0BD6EE0FDCB5D402.jpg", "https://www.nps.gov/common/uploads/structured_data/3C79931C-1DD8-B71B-0BF201E3DB540D04.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7A0DE5-1DD8-B71B-0BFBE720788EF4A3.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg", "https://www.nps.gov/common/uploads/structured_data/3C82EE63-1DD8-B71B-0BD6EE0FDCB5D402.jpg", "https://www.nps.gov/common/uploads/structured_data/36C156B0-F6CA-1972-F3B88C971DE39767.jpg", "https://www.nps.gov/common/uploads/structured_data/36C156B0-F6CA-1972-F3B88C971DE39767.jpg", "https://www.nps.gov/common/uploads/structured_data/3C79850F-1DD8-B71B-0BC4A88BA85DE6B0.jpg", "https://www.nps.gov/common/uploads/structured_data/36C156B0-F6CA-1972-F3B88C971DE39767.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7A0C49-1DD8-B71B-0B460D58D6E83B40.jpg", "https://www.nps.gov/common/uploads/structured_data/36C156B0-F6CA-1972-F3B88C971DE39767.jpg", "https://www.nps.gov/common/uploads/structured_data/3C82EE63-1DD8-B71B-0BD6EE0FDCB5D402.jpg", "https://www.nps.gov/common/uploads/structured_data/3C7B477B-1DD8-B71B-0BCB48E009241BAA.jpg"
]


class HomeContainer extends React.Component {

  componentDidMount() {
    fetch("https://developer.nps.gov/api/v1/parks?&limit=1000&api_key=wrzMX2zd8xPlWQotxViQtACAPNmjfcmoylyVV7oR")
    .then(resp => resp.json())
    .then(parks => this.props.setAllParks(parks.data))
    // .then(this.getUrls)
  }

  getUrls = () => {
    if (this.props.state.placesReducer.parks) {
      this.props.state.placesReducer.parks.forEach(park => {
        park.images.forEach(image => {
          if (image.url && park.designation === "National Park") {
            images.push(image.url)
          }
        })
      })
    }

    // if (this.props.state.placesReducer.parks) {
    //   this.props.state.placesReducer.parks.forEach(park => {
    //     let obj = {}
    //     park.images.forEach(image => {
    //       if (image.url) {
    //         if (!images.some(i => Object.keys(i).includes(park.fullName))) {
    //           obj[park.fullName] = image.url 
    //           images.push(obj)
    //         }
    //       } 
    //     })
    //   })
    // }

    // For Generating Random 
    // var colArr = [];
    // for (var i = 0; i < 6; i++) {
    // var colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e","f"];
    //   var rand = colors[Math.floor(Math.random() * 16)];
    //   colArr.push(rand);
    // }

  }
          // obj[park.fullName] = []

  render () {
    return (
      <div className="homeContainer" >

      {/* < Slider slides={images} autoPlay={5} /> */}
        {this.props.state.placesReducer.parks 
        ?
          <>
            < HomeForm />  
            < Map />
          </>
        : <CircularProgress style={{color: "white"}}/>
        }
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