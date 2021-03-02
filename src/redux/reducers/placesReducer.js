const initialState = {
    start: null,
    end: null,
    area: null,
    places: null,
    active: "Parks",
    parks: null
}

const placesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'START_FORM_INPUT':
            return {
                ...state, start: action.start
            }
        case 'END_FORM_INPUT':
            return {
                ...state, end: action.end
            }
        case 'SET_AREA':
            return {
                ...state, area: action.area
            }
        case 'SET_FILTERED_PARKS':
            return {
                ...state, places: action.places
            }
        case 'SET_ACTIVE_PANEL':
            return {
                ...state, active: action.active
            }
        case 'SET_ALL_PARKS':
            return {
                ...state, parks: action.parks
            }
        default:
            return state
    }
}

export default placesReducer