import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    console.log("will time out in:", expirationTime)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (obj) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: obj.email,
            password: obj.password,
            returnSecureToken: true
        }
        let url = '';
        if (obj.isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0uUM4g_xONjsm7qnxrp2YJKqUIkGDPU';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd0uUM4g_xONjsm7qnxrp2YJKqUIkGDPU';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}