const initialState = {
    homeForm: {},
    area: null,
    places: null,
    active: "Parks"
}

const placesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PLACES_FORM_INPUT':
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
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
        default:
            return state
    }
}

export default placesReducer