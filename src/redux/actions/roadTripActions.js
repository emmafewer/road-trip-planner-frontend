export const roadTripHandleOnChange = (e) => {
    return {
        type: 'NEW_TRIP_INPUT',
        key: e.target.id,
        value: e.target.value,
        formType: e.target.name
    }
}

export const setNewTrip = (trip) => {
    return {
        type: 'SET_NEW_TRIP',
        newTrip: trip
    }
}