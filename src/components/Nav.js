import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
import {connect} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#21bd81"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
}));

const Nav = (props) => { 
  const { history } = props
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (url) => {
    history.push(url)
    setAnchorEl(null)
  }

  const handleLogout = (props) => {
    localStorage.clear()
    history.push('/login')
    setAnchorEl(null)
  }

  return (
    <div >
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trip Planner
          </Typography>
            <div className={classes.rightToolbar}>
              {!localStorage.token
              ?
                <>
                  <Button onClick={() => handleClick('/login')} color="inherit">Login</Button>
                  <Button onClick={() => handleClick('/signup')} color="inherit">Signup</Button>
                </>
              :
              <>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu" 
                id="hamburger"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="hambuger"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClick('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                  props.logout()
                  handleLogout()
                }}>Logout</MenuItem>
              </Menu>
            </>
            }

            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Nav))