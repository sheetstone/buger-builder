import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {};
            newOrder[action.orderData.orderId] = {...action.orderData}
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: Object.assign(state.orders, newOrder)
            };
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionType.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;