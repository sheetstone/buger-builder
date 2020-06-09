import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (obj) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        ...obj
    }
}

export const purchaseBurgerFail = (obj) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        ...obj
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess({responsedata: response.data, orderData: orderData}));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail({error: error}));
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess = (obj) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        ...obj
    }
}

export const fetchOrderStart= () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrderFail= (obj) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        ...obj
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        console.log(token)
        axios.get('/orders.json?auth='+token)
        .then(response => {
            dispatch(fetchOrderSuccess({orders: response.data}))
        })
        .catch(error => {
            dispatch(fetchOrderFail({error: error}))
        })
    }
}