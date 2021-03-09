const initialState = {
    activeFeature: null,
    features: null,
    routeType: null,
    start: null,
    end: null,
    routeParams: null
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
        case 'SET_TYPE':
            return {
                ...state, routeType: action.routeType
            }
        case 'SET_START':
            return {
                ...state, start: action.start
            }
        case 'SET_END':
            return {
                ...state, end: action.end
            }
        case 'SET_ROUTE_PARAMS':
            return {
                ...state, routeParams: action.routeParams
            }
        default:
            return state
    }
}

export default mapReducer