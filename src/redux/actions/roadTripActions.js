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

export const roadTripDates = (e) => {
    return {
        type: 'ROAD_TRIP_DATE_INPUT',
        key: e.target.id,
        value: e.target.value,
        formType: e.target.name
    }
}