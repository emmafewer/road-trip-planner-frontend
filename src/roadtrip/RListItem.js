import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

const BASE_URL = 'http://localhost:4000'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RListItem = (props) => {
  const classes = useStyles();

  return (
    <Box m={2} pt={3}>
        <Card className={classes.root} >
        <CardContent>
            <Typography variant="h5" component="h2">
            {props.place.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {/* {props.trip.start_date} - {props.trip.end_date} */}
            </Typography>
        </CardContent>
        </Card>
    </Box>
  );
}

export default RListItem