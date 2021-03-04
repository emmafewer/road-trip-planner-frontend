import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { roadTripHandleOnChange } from '../redux/actions/roadTripActions';
import {connect} from 'react-redux'

const StartAndEndDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  }

  const setStart = (place, props) => {

  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select Start</DialogTitle>
      <List>
        {props.state.roadTripReducer.places &&
        props.state.roadTripReducer.places.map((place) => (
          <ListItem button onClick={() => {
            setStart(place, props)
            handleClose()}}
            key={place.name}
          >
            <ListItemText primary={place.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roadTripHandleOnChange: (input) => dispatch(roadTripHandleOnChange(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartAndEndDialog)