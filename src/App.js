import React from 'react'
import Nav from './components/Nav'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import {connect} from 'react-redux'
import HomeContainer from './containers/HomeContainer'
import { Route, withRouter, Switch } from 'react-router-dom'
import {setUser} from './redux/actions/userActions'
import ShowContainer from './containers/ShowContainer'
import MyRoadTrips from './components/MyRoadTrips'
import RoadTripContainer from './containers/RoadTripContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const BASE_URL = 'http://localhost:4000'

class App extends React.Component {

  componentDidMount() {
    const token = localStorage.token
    if (token) {
      this.persistUser(token)
    }
  }

  persistUser = (token) => {
    fetch(`${BASE_URL}/persist`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      const { id, username, name } = data
      data.username && this.props.setUser({ id, username, name })
    })
  }

  render () {
    return (
     
      <div className="App">
         
        < Nav />
        <div className="mainContainer">
          {localStorage.token 
          ? 
          <>
            <Route exact path='/' render={() => < HomeContainer />} />
            <Route exact path='/places' render={() => < ShowContainer />} />
            <Route exact path='/profile' render={() => < Profile />}/>
            <Route exact path='/road_trips' render={(props) => < MyRoadTrips {...props}/>}/>
            <Route exact path='/road_trip' render={(props) => < RoadTripContainer {...props}/>}/>
          </>
          : 
          <>
            <Route exact path='/signup' render={() => < Signup />}/>
            <Route exact path='/login' render={() => < Login />}/>
          </>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
