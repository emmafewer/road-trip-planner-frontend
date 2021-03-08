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
