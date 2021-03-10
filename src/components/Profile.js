import React from "react"
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import { setUser } from '../redux/actions/userActions'
import { setRoadTripList } from '../redux/actions/roadTripActions'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000'

class Profile extends React.Component {

  logOut = () => {
    localStorage.clear()
    this.props.setUser({user: {}})
    this.props.setRoadTripList({trips: null})
  }

  updateUser = (e) => {
    e.preventDefault()
    fetch(`${BASE_URL}/users/${this.props.state.userReducer.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            'name': e.target.name.value
        })
    })
    .then(resp => resp.json())
    .then(json => this.props.setUser({id: json.id, username: json.username, name: json.name}))  
  }

  deleteUser = () => {
    fetch(`${BASE_URL}/users/${this.props.state.userReducer.user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(this.logOut())
    .then(this.props.history.push('/login'))
  }

  render() {
    return (
        <div id="profile" className='userContainer'>
            <h1 className='row justify-content-center'>Profile</h1>
            <div style={{textAlign: "center"}}>
                <h3>Name: {this.props.state.userReducer.user.name}</h3>
                <h3>Username: {this.props.state.userReducer.user.username}</h3>
                <form style={{paddingBottom: "2em"}} onSubmit={this.updateUser}>
                    <input type="text" name="name" placeholder="Update Name"/>
                    <br></br>
                    <br></br>
                  <Button 
                    variant="contained" 
                    color="default"
                    type="submit"
                  >
                    Update Name
                  </Button>
                </form>

                <Button 
                  variant="contained" 
                  color="default"
                  onClick={this.deleteUser}
                >
                  Delete User
                </Button>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setUser: (user) => dispatch(setUser(user)),
      setRoadTripList: (trips) => dispatch(setRoadTripList(trips)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))