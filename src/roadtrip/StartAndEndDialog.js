import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { setType, setStart, setEnd, setRouteParams } from '../redux/actions/mapActions';
import {connect} from 'react-redux'
import AutoComplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { joinPlaces, setShow } from '../redux/actions/roadTripActions';
import { setActivePanel } from '../redux/actions/placesActions';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const StartAndEndDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  }

  const handleSubmit = () => {
    let startPlace = props.state.roadTripReducer.places.find(place => place.name === props.state.mapReducer.start)
    if (props.state.mapReducer.routeType === "Round-Trip") {
      let filteredPlaces = props.state.roadTripReducer.places.filter(place => place.name !== startPlace.name)
      filteredPlaces.unshift(startPlace)
      props.joinPlaces(filteredPlaces)
    } else {
      let endPlace = props.state.roadTripReducer.places.find(place => place.name === props.state.mapReducer.end)
      let filteredPlaces = props.state.roadTripReducer.places.filter(place => place.name !== startPlace.name && place.name !== endPlace.name)
      filteredPlaces.unshift(startPlace)
      filteredPlaces.push(endPlace)
      props.joinPlaces(filteredPlaces)
    }
  }

  return (
    <>
    {props.state.roadTripReducer.places.length <= 12 
    ?
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">One Way or Round-Trip</DialogTitle>
          <AutoComplete
            options={["One-Way", "Round-Trip"]}
            getOptionLabel={(option) => option}
            onChange={props.setType}
            renderInput={(params) => <TextField {...params} label="Select Direction"/>}
          >
          </AutoComplete>

          <AutoComplete
            options={props.state.roadTripReducer.places}
            getOptionLabel={(option) => option.name}
            onChange={props.setStart}
            renderInput={(params) => <TextField {...params} label="Start Location"/>}
          >
          </AutoComplete>

          {props.state.mapReducer.routeType === "One-Way" &&
          <AutoComplete
            options={props.state.roadTripReducer.places}
            getOptionLabel={(option) => option.name}
            onChange={props.setEnd}
            renderInput={(params) => <TextField {...params} label="End Location"/>}
          >
          </AutoComplete>

          }
          <Button 
            variant="contained" 
            color="default"
            name="Route View"
            onClick={(e) => {
              handleSubmit()
              handleClose()
              props.setShow(e)
              props.setActivePanel(e)
            }}
          >Route View</Button>
      </Dialog>
    : 
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Route View can only be utilized if the number of parks and campgrounds for this road trip is less than 12.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      </div>    
    }
    </>
  );
}



const mapStateToProps = state => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setType: (input) => dispatch(setType(input)),
    setStart: (input) => dispatch(setStart(input)),
    setEnd: (input) => dispatch(setEnd(input)),
    joinPlaces: (places) => dispatch(joinPlaces(places)),
    setActivePanel: (button) => dispatch(setActivePanel(button)),
    setShow: (name) => dispatch(setShow(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartAndEndDialog)