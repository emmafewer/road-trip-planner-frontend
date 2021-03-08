import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { setRoadTripList, setTrip } from '../redux/actions/roadTripActions';
import {connect} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';

const BASE_URL = 'http://localhost:4000'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const RSideCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getImageUrl = (props) => {
      if (props.place.image) {
        return props.place.image
      } else {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEcx8TdMdVfPYsB494JJm8jowH9FnwXwCgQ&usqp=CAU"      
      }
  }

  const goToWebsite = (props) => {
      return alert(props.place.url)
  }

  const fetchTrip = (props) => {
    if (props.state.placesReducer.active === "Parks") {
      const newParkArray = props.state.roadTripReducer.trip.parks.filter(park => park.id !== props.place.id)
      props.setTrip({...props.state.roadTripReducer.trip, parks: newParkArray})
    } else if (props.state.placesReducer.active === "Campgrounds") {
      const newCampArray = props.state.roadTripReducer.trip.campgrounds.filter(campground => campground.id !== props.place.id)
      props.setTrip({...props.state.roadTripReducer.trip, campgrounds: newCampArray})
    }
  }

  const deletePlace = (props) => {
    if (props.state.placesReducer.active === "Parks") {
        fetch(`${BASE_URL}/parks/${props.place.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(fetchTrip(props))
    } else if (props.state.placesReducer.active === "Campgrounds") {
        fetch(`${BASE_URL}/campgrounds/${props.place.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(fetchTrip(props))
    }
  }

  const getSubheader = () => {
    if (props.state.placesReducer.active === "Campgrounds") {
      return (props.state.placesReducer.parks.find(park => park.parkCode === props.place.park_code).fullName)
    }
  }

  return (
    <Card className={classes.root} style={{maxHeight: '100%'}} >
      <CardHeader
        title={props.place.name}
        subheader={getSubheader()}
        />
      <CardMedia
        className={classes.media}
        image={getImageUrl(props)}
      />
      <CardActions disableSpacing>
        <IconButton 
            aria-label="delete from road trip"
            color="inherit" 
            id="delete"
            onClick={() => deletePlace(props)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="website" onClick={() => goToWebsite(props)}>
          <OpenInNewIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.place.description}
          </Typography>
          <Typography paragraph>
            Can put little emoticons of the activities here as a stretch goal.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setRoadTripList: (trips) => dispatch(setRoadTripList(trips)),
      setTrip: (trip) => dispatch(setTrip(trip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSideCard)