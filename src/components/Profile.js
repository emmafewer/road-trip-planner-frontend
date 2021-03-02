import React from "react"
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

class Profile extends React.Component {

  render() {
    return (
        <div id="profile" className='container' style={{paddingBottom: "40px"}}>
            <h1 className='row justify-content-center'>Profile</h1>
            <div>
                <h3>Name: {this.props.state.userReducer.user.name}</h3>
                <h3>Username: {this.props.state.userReducer.user.username}</h3>
                <form style={{paddingBottom: "2em"}} onSubmit={(e) => this.props.updateUser(e, this.props.userReducer.user)}>
                    <input type="text" name="name" placeholder="Update Name"/>
                    <br></br>
                    <br></br>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    type="submit"
                  >
                    Update Name
                  </Button>
                </form>

                <Button 
                  variant="outlined" 
                  color="secondary"
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

export default connect(mapStateToProps)(Profile);