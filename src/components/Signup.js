import React from 'react'
import {connect} from 'react-redux'
// import {signUserUp} from '../redux/actions/userActions'
import { handleOnChange, setUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000'

class Signup extends React.Component {

    handleAuthResponse = (data) => {
        if (data.username) {
            const { username, id, token, name } = data
            localStorage.setItem('token', token)
            this.props.setUser({username, id, name})
            this.props.history.push('/')
        } else {
            alert(data.error)
        }
    }

    signup = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/users`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({user: this.props.state.userReducer.signup})
        })
        .then(res => res.json())
        .then(data => this.handleAuthResponse(data))
    }

    render(){
        return(
            <div>
                <h1>SignUp Form</h1>
                <form className="signup" onSubmit={this.signup}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={this.props.handleOnChange}
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.props.handleOnChange}
                    />
                    <br/>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.props.handleOnChange}
                    />

                    <br/>
                    <input
                        type="submit"
                        value="Signup"
                    />
                </form>
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
        handleOnChange: (input) => dispatch(handleOnChange(input)),
        setUser: (user) => dispatch(setUser(user))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))