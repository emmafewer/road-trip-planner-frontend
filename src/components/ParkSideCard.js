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
import SimpleDialog from './SimpleDialog'
import { setRoadTripList } from '../redux/actions/roadTripActions';
import {connect} from 'react-redux'

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

const ParkSideCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (props) => {
    setOpen(true);

    fetch(`${BASE_URL}/users/${props.state.userReducer.user.id}`,{
        method: 'GET',
        headers : {Authorization: `Bearer ${localStorage.token}`}, 
      })
      .then(res => res.json())
      .then(user => props.setRoadTripList(user.road_trips))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getImageUrl = (props) => {
      if (props.park.images !== undefined) {
        return props.park.images[0].url
      } else {
        return "https://lh3.googleusercontent.com/proxy/9DYTFvUQeKcswSHh3U8poRVsvO2vPFZAHJXaTHAih0BAXtLXheEFEE7V0dSbqW0hsgcvecO90mbDR_um785KtDjX9C3F3s45mG7Z1HhCoZ_X1YXaRkDPXqU"      
      }
  }

  const getImageDesc = (props) => {
    if (props.park.images !== undefined) {
      return props.park.images[0].caption
    } else {
      return ""      
    }
  }

  const goToWebsite = (props) => {
      return alert(props.park.url)
  }

  return (
    <Card className={classes.root} style={{maxHeight: '100%', overflow: 'auto'}}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.park.fullName}
        // subheader="September 14, 2016"
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
            aria-label="add to road trip"
            edge="start" 
            color="inherit" 
            id="add"
            onClick={() => handleClickOpen(props)}>
          <AddIcon />
        </IconButton>
        <SimpleDialog open={open} onClose={handleClose} park={props.park}/>
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
            {props.park.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkSideCard)