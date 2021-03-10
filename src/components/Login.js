import React from 'react'
import {connect} from 'react-redux'
import { handleOnChange, setUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Button from '@material-ui/core/Button'

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
            <div className="userContainer">
                <h3>Login</h3>
                <form className="login" onSubmit={this.login}>
                    <TextField
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={this.props.handleOnChange}
                    />
                    <br/>
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.props.handleOnChange}
                    />
                    <br/>
                    <br/>
                    <Button
                        variant="contained" 
                        style={{backgroundColor: "#618662", color: "white"}}
                        type="submit"
                        value="Login"
                    >Login</Button>
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