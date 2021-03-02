import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mapboxgl from 'mapbox-gl';
import { placesHandleOnChange, setArea } from '../redux/actions/placesActions';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';

// const useGeocoder = () => {
  // mapboxgl.accessToken = 'pk.eyJ1IjoiZW1mZXdlciIsImEiOiJja2xneTM5aHE0M2h0Mm9wZWIxczA4Zzg1In0.P87Yiu97CtgjPvN4JoYCrw';
  // var geocoder = new MapboxGeocoder({
  // accessToken: mapboxgl.accessToken,
  // types: 'country,region,place,postcode,locality,neighborhood'
  // });
   
  // geocoder.addTo('#geocoder');
// }


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const HomeForm = (props) => {
  const classes = useStyles();

  const parkNames = {}
  // props.state.placesReducer.parks.map(park => park.fullName)

  return (
    <div className="homeForm">
      {/* <div id="geocoder">{useGeocoder}</div> */}
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => {
          e.preventDefault()
          props.setArea(props.state.placesReducer.homeForm)
          props.history.push('/places')}}
          >

          <Autocomplete
            id="combo-box-demo"
            options={parkNames}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />

          <Autocomplete
            id="combo-box-demo"
            options={parkNames}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
        {/* <TextField 
          size="small" 
          id="start" 
          name="homeForm"
          label="Start Location" 
          variant="outlined"
          onChange={props.placesHandleOnChange}
        />
        <TextField 
          size="small" 
          id="end" 
          name="homeForm"
          label="End Location" 
          variant="outlined" 
          onChange={props.placesHandleOnChange}
        /> */}
        <Button 
          variant="contained" 
          color="secondary"
          type="submit"
        >View Places</Button>
        
        </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    placesHandleOnChange: (input) => dispatch(placesHandleOnChange(input)),
    setArea: (area) => dispatch(setArea(area)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeForm))