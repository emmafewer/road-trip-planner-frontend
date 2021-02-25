const initialState = {
    signup: {
        name: "",
        username: "",
        password: ""
    },
    login: {
        username: "",
        password: ""
    },
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FORM_INPUT':
            return {
                ...state, [action.formType]: {...state[action.formType], [action.key]: action.value}
            }
        case 'SET_USER':
            return {
                ...state, user: action.user
            }
        case 'LOGOUT':
            return {
                ...state, user: action.user
            }
        default:
            return state
    }
}

export default userReducer

