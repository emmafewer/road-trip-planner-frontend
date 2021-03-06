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
import { joinPlaces, setTrip, setShow } from '../redux/actions/roadTripActions';
import { setActivePanel, setFilteredParks } from '../redux/actions/placesActions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#618662"
    // #b5db82
    // #B2D08A
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
          <Typography 
            variant="h6" 
            className={classes.title} 
            onClick={() => {
              handleClick('/')
              props.joinPlaces("")
              props.setTrip("")
              props.setShow("Map")
              props.setActivePanel("Parks")
              props.setFilteredParks("")
            }}>
            Park Planner
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
                <MenuItem onClick={() => {
                  handleClick('/road_trips')
                  props.joinPlaces([])
                  props.setTrip("")
                  props.setShow("Map")
                  props.setActivePanel("Parks")}}>My Road Trips</MenuItem>
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
      logout: () => dispatch(logout()),
      joinPlaces: (place) => dispatch(joinPlaces(place)),
      setTrip: (empty) => dispatch(setTrip(empty)),
      setShow: (string) => dispatch(setShow(string)),
      setActivePanel: (string) => dispatch(setActivePanel(string)),
      setFilteredParks: (empty) => dispatch(setFilteredParks(empty))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Nav))