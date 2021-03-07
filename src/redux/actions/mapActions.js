export const setActiveFeature = (id) => {
    return {
        type: 'SET_ACTIVE_FEATURE',
        activeFeature: id,
    }
}

export const setMap = (map) => {
    return {
        type: 'SET_MAP',
        map: map,
    }
}