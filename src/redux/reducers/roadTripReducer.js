const initialState = {
    homeForm: {},
    trip: null,
}

const roadTripReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TRIP_INPUT':
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'SET_NEW_TRIP':
            return {
                ...state, trip: action.trip
            }
        default:
            return state
    }
}

export default roadTripReducer