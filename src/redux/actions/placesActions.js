export const placesHandleOnChange = (e) => {
    return {
        type: 'PLACES_FORM_INPUT',
        key: e.target.id,
        value: e.target.value,
        formType: e.target.name
    }
}

export const setArea = (area) => {
    return {
        type: 'SET_AREA',
        area: area
    }
}

export const setFilteredParks = (places) => {
    return {
        type: 'SET_FILTERED_PARKS',
        places: places
    }
}

export const setActivePanel = (e) => {
    return {
        type: 'SET_ACTIVE_PANEL',
        active: e.target.innerHTML
    }
}

export const setAllParks = (parks) => {
    return {
        type: 'SET_ALL_PARKS',
        parks: parks
    }
}

