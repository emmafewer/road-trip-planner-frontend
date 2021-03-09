export const setActiveFeature = (id) => {
    return {
        type: 'SET_ACTIVE_FEATURE',
        activeFeature: id,
    }
}

export const setFeatures = (features) => {
    return {
        type: 'SET_FEATURES',
        features: features,
    }
}

export const setType = (e) => {
    return {
        type: 'SET_TYPE',
        routeType: e.target.innerHTML,
    }
}

export const setStart = (e) => {
    return {
        type: 'SET_START',
        start: e.target.innerHTML,
    }
}

export const setEnd = (e) => {
    return {
        type: 'SET_END',
        end: e.target.innerHTML,
    }
}

export const setRouteParams = (params) => {
    return {
        type: 'SET_ROUTE_PARAMS',
        routeParams: params,
    }
}
