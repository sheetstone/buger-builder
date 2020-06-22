import * as actionTypes from './actionTypes';

export const addIngredient = (obj) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ...obj
    }
}

export const removeIngredient = (obj) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ...obj
    }
}

export const setIngredients = (obj) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ...obj
    }
}

export const fetchIngredientFailed = (obj) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
        ...obj
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
    }
}

export const updateTotal = () => {
    return {
        type: actionTypes.UPDATA_TOTAL,
    }
}