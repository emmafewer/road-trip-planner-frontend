export const startHandleOnChange = (e) => {
    return {
        type: 'START_FORM_INPUT',
        start: e.target.innerText,
    }
}

export const endHandleOnChange = (e) => {
    return {
        type: 'END_FORM_INPUT',
        end: e.target.innerText,
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

