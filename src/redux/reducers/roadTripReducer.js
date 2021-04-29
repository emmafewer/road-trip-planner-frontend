const initialState = {
    newTripInput: null,
    trips: null,
    trip: "",
    dates: null, 
    places: [],
    show: "Map"
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
        case 'ROAD_TRIP_DATE_INPUT':
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'JOIN_PLACES':
            return {
                ...state, places: action.places
            }
        case 'SET_SHOW':
            return {
                ...state, show: action.show
            }
        case 'SET_TOTAL':
            return {
                ...state, tripTotal: action.tripTotal
            }
        default:
            return state
    }
}

export default roadTripReducer