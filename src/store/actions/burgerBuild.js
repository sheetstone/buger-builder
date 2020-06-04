import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

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
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients({ingredients: response.data}))
            })
            .catch(error => {
                dispatch(fetchIngredientFailed({error: error}));
            })
    };
}

export const updateTotal = () => {
    return {
        type: actionTypes.UPDATA_TOTAL,
    }
}