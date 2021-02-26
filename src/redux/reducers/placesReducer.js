const initialState = {
    homeForm: {},
    area: {}
}

const placesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FORM_INPUT':
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'SET_AREA':
            return {
                ...state, area: action.area
            }
        default:
            return state
    }
}

export default placesReducer