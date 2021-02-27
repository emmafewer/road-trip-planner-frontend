import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SimpleDialog from './SimpleDialog'

const emails = ['Utah 5 Days 5 NPs', 'West Coast Dreamin'];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

export default function ParkSideCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getImageUrl = (props) => {
      if (props.park.images[0].url) {
        return props.park.images[0].url
      } else {
        return "https://lh3.googleusercontent.com/proxy/9DYTFvUQeKcswSHh3U8poRVsvO2vPFZAHJXaTHAih0BAXtLXheEFEE7V0dSbqW0hsgcvecO90mbDR_um785KtDjX9C3F3s45mG7Z1HhCoZ_X1YXaRkDPXqU"      
      }
  }

  const getImageDesc = (props) => {
    if (props.park.images[0].caption) {
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
            onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
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
