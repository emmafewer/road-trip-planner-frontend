import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mapboxgl from 'mapbox-gl';
import { placesHandleOnChange, setArea, startHandleOnChange, endHandleOnChange } from '../redux/actions/placesActions';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const NPs =  props.state.placesReducer.parks.map(park => park.fullName)
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!props.state.placesReducer.start || !props.state.placesReducer.end) {
      alert("Please select a place from the drop-down")
    } else {
      props.setArea({start: props.state.placesReducer.start, end: props.state.placesReducer.end})
      props.history.push('/places')
    }
  }

  return (
    <div className="homeForm">
        <form 
          style={{display: "flex"}} 
          className={classes.root} 
          noValidate autoComplete="on" 
          onSubmit={handleSubmit}
        >

          <Autocomplete
            id="start"
            label="homeForm"
            type="start"
            options={NPs}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={props.startHandleOnChange}
            renderInput={(params) => <TextField {...params} label="Start Location" variant="outlined"/>}
          />

          <Autocomplete
            id="end"
            name="homeForm"
            type="end"
            options={NPs}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={props.endHandleOnChange}
            renderInput={(params) => <TextField {...params} label="End Location" variant="outlined"/>}
          />

        <Button 
          variant="contained" 
          color="default"
          type="submit"
        >View Parks and Campgrounds</Button>
        
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
    startHandleOnChange: (input) => dispatch(startHandleOnChange(input)),
    endHandleOnChange: (input) => dispatch(endHandleOnChange(input)),
    setArea: (area) => dispatch(setArea(area)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeForm))