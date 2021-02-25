import React from 'react'
import Nav from './components/Nav'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import {connect} from 'react-redux'
import HomeContainer from './containers/HomeContainer'
import { Route, withRouter, Switch } from 'react-router-dom'
import {setUser} from './redux/actions/userActions'

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
            <Route exact path='/profile' render={() => < Profile />}/>
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
