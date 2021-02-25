import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mapboxgl from 'mapbox-gl';

const useGeocoder = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw';
  var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: 'country,region,place,postcode,locality,neighborhood'
  });
   
  geocoder.addTo('#geocoder');
}


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const HomeForm = () => {
  const classes = useStyles();

  return (
    <div className="homeForm">
      <div id="geocoder">{useGeocoder}</div>

        {/* <form className={classes.root} noValidate autoComplete="off">
        <TextField size="small" id="standard-basic" label="Start Location" variant="outlined"/>
        <TextField size="small" id="filled-basic" label="End Location" variant="outlined" />
        <Button variant="contained" color="secondary">View Places</Button>
        
        </form> */}
    </div>
  );
}

export default HomeForm