const initialState = {
    newTripInput: null,
    newTrip: null,
}

const roadTripReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TRIP_INPUT':
            return {
                ...state, newTripInput: action.value
            }
        case 'SET_NEW_TRIP':
            return {
                ...state, newTrip: action.newTrip
            }
        default:
            return state
    }
}

export default roadTripReducer