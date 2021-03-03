import React from 'react'
import {connect} from 'react-redux'
import { handleOnChange, setUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000'

class Login extends React.Component {

    handleAuthResponse = (data) => {
        if (data.username) {
            const { id, username, token, name } = data
            localStorage.setItem('token', token)
            this.props.setUser({id, username, name})
            this.props.history.push('/')
        } else {
            alert(data.error)
        }
    }

    login = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/login`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(this.props.state.userReducer.login)
        })
        .then(res => res.json())
        .then(data => this.handleAuthResponse(data))
    }

    render(){
        return(
            <div>
                <h1 style={{color: "white"}}>Login Form</h1>
                <form className="login" onSubmit={this.login}>
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
                        type="submit"
                        value="Login"
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

const mapDispatchToProps = dispatch => {
    return {
        handleOnChange: (input) => dispatch(handleOnChange(input)),
        setUser: (user) => dispatch(setUser(user))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))