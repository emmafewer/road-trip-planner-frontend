import userReducer from './userReducer'
import placesReducer from './placesReducer'
import roadTripReducer from './roadTripReducer'
import mapReducer from './mapReducer'
import {combineReducers} from 'redux'

const appReducer = combineReducers({
    userReducer,
    placesReducer,
    roadTripReducer,
    mapReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer

