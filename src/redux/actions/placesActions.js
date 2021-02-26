export const handleOnChange = (e) => {
    return {
        type: 'FORM_INPUT',
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

export const setFilteredParks = (parks) => {
    return {
        type: 'SET_FILTERED_PARKS',
        parks: parks
    }
}
