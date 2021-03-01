export const roadTripHandleOnChange = (e) => {
    return {
        type: 'NEW_TRIP_INPUT',
        value: e.target.value
    }
}

export const setRoadTripList = (trips) => {
    return {
        type: 'SET_LIST',
        trips: trips
    }
}

export const setTrip = (trip) => {
    return {
        type: 'SET_TRIP',
        trip: trip
    }
}