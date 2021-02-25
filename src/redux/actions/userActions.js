export const handleOnChange = (e) => {
    return {
        type: 'FORM_INPUT',
        key: e.target.name,
        value: e.target.value,
        formType: e.target.parentElement.className
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
        user: {}
    }
}

