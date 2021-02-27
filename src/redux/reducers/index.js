import userReducer from './userReducer'
import placesReducer from './placesReducer'
import roadTripReducer from './roadTripReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    placesReducer,
    roadTripReducer
})

export default rootReducer