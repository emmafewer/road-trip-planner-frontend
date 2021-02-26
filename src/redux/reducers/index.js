import userReducer from './userReducer'
import placesReducer from './placesReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    placesReducer
})

export default rootReducer