const initialState = {
    activeFeature: null
}

const mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_FEATURE':
            return {
                ...state, activeFeature: action.activeFeature
            }
        case 'SET_FEATURES':
            return {
                ...state, features: action.features
            }
        default:
            return state
    }
}

export default mapReducer