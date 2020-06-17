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
                const expriationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expriationDate);
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setRedirectPath = (obj) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        ...obj
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime < new Date()){
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({
                    idToken: token,
                    localId: userId,
                }));
                dispatch(checkAuthTimeout(expirationTime.getTime() - new Date().getTime()));
            }
        }
    }
}