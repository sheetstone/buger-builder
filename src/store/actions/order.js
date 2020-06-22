import * as actionTypes from './actionTypes';

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
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
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

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
}