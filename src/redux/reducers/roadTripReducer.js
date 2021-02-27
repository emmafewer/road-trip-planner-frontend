const initialState = {
    newTripInput: null,
    trips: null,
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
        default:
            return state
    }
}

export default roadTripReducer