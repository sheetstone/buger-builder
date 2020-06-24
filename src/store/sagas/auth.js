import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actionCreator from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actionCreator.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actionCreator.logout())
}

export function* authUserSaga(action) {
        yield put(actionCreator.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        let url = '';
        if (action.isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0uUM4g_xONjsm7qnxrp2YJKqUIkGDPU';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd0uUM4g_xONjsm7qnxrp2YJKqUIkGDPU';
        }
        try {
            const response =  yield axios.post(url, authData);
            const expriationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationTime', expriationDate);
            yield localStorage.setItem('userId', response.data.localId)
            yield put(actionCreator.authSuccess(response.data));
            yield put(actionCreator.checkAuthTimeout(response.data.expiresIn * 1000));
        } catch(err) {
            yield put(actionCreator.authFail(err.response.data.error));
        }
}

export function* authCheckStateSage(action){
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actionCreator.logout());
    }else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(expirationTime < new Date()){
            yield put(actionCreator.logout());
        }else {
            const userId = localStorage.getItem('userId');
            yield put(actionCreator.authSuccess({
                idToken: token,
                localId: userId,
            }));
            yield put(actionCreator.checkAuthTimeout(expirationTime.getTime() - new Date().getTime()));
        }
    }
}