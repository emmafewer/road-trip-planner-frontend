import userReducer from './userReducer'
import placesReducer from './placesReducer'
import roadTripReducer from './roadTripReducer'
import mapReducer from './mapReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    placesReducer,
    roadTripReducer,
    mapReducer,
})

export default rootReducer