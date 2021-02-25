import React from "react"
import {connect} from 'react-redux'

class Profile extends React.Component {

  render() {
    return (
        <div id="profile" className='container' style={{paddingBottom: "40px"}}>
            <h1 className='row justify-content-center'>Profile</h1>
            <div>
                <h3>Name: {this.props.state.userReducer.user.name}</h3>
                <h3>Username: {this.props.state.userReducer.user.username}</h3>
                <form style={{paddingBottom: "2em"}} onSubmit={(e) => this.props.updateUser(e, this.props.userReducer.user)}>
                    <input className='col-3' style={{height:'30px', borderWidth:'1px', borderRadius:'3px'}} type="text" name="name" placeholder="Update Name"/>
                    <br></br>
                    <br></br>
                    <button className='col-2 btn-outline-secondary btn btn-md' type="submit" value="Submit">Submit</button>
                </form>
                <button onClick={() => this.props.deleteUser(this.props.state.userReducer.user)} className='col-2 btn-outline-secondary btn btn-md'>Delete User</button>
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