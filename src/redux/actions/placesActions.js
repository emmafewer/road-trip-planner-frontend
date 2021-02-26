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
