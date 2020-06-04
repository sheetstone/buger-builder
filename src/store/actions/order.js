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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
        .then(response => {
            dispatch(fetchOrderSuccess({orders: response.data}))
        })
        .catch(error => {
            dispatch(fetchOrderFail({error: error}))
        })
    }
}