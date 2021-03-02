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
import { setRoadTripList } from '../redux/actions/roadTripActions';
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
      if (props.place.images !== undefined) {
        return props.place.images[0].url
      } else {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEcx8TdMdVfPYsB494JJm8jowH9FnwXwCgQ&usqp=CAU"      
      }
  }

  const getImageDesc = (props) => {
    if (props.place.images !== undefined) {
      return props.place.images[0].caption
    } else {
      return ""      
    }
  }

  const goToWebsite = (props) => {
      return alert(props.place.url)
  }

  const deletePlace = (props) => {
    if (props.state.placesReducer.active === "Parks") {
        fetch(`${BASE_URL}/parks/${props.place.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
    } else if (props.state.placesReducer.active === "Campgrounds") {
        fetch(`${BASE_URL}/campgrounds/${props.place.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
    }

  }

  return (
    <Card className={classes.root} style={{maxHeight: '100%'}}>
      <CardHeader
        title={props.place.name}
      />
      <CardMedia
        className={classes.media}
        image={getImageUrl(props)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {getImageDesc(props)}
        </Typography>
      </CardContent>
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
      setRoadTripList: (trips) => dispatch(setRoadTripList(trips))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSideCard)