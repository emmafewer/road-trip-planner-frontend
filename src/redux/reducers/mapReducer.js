const initialState = {
    activeFeature: null
}

const mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_FEATURE':
            return {
                ...state, activeFeature: action.activeFeature
            }
        default:
            return state
    }
}

export default mapReducer