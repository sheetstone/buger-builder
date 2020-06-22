import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (obj) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        ...obj
    }
}

export const authFail = (obj) => {
    return {
        type: actionTypes.AUTH_FAIL,
        ...obj
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECKTIMEOUT,
        expirationTime: expirationTime
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (obj) =>{
    return {
        type: actionTypes.AUTH_USER,
        ...obj
    }
}

export const setRedirectPath = (obj) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        ...obj
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}