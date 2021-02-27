export const roadTripHandleOnChange = (e) => {
    return {
        type: 'NEW_TRIP_INPUT',
        value: e.target.value
    }
}

export const setNewTrip = (trip) => {
    return {
        type: 'SET_NEW_TRIP',
        newTrip: trip
    }
}