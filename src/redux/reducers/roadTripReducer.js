const initialState = {
    newTripInput: null,
    trips: null,
    trip: null,
}

const roadTripReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TRIP_INPUT':
            return {
                ...state, newTripInput: action.value
            }
        case 'SET_LIST':
            return {
                ...state, trips: action.trips
            }
        case 'SET_TRIP':
            return {
                ...state, trip: action.trip
            }
        default:
            return state
    }
}

export default roadTripReducer