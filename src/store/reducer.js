import * as actionType from './action'

const initalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    total: 4
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 1
}

const reducer = (state = initalState, action) => {
    switch (action.type){
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsType]: state.ingredients[action.ingredientsType] + 1
                },
                total: INGREDIENTS_PRICE[action.ingredientsType] + state.total
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsType]: state.ingredients[action.ingredientsType] - 1
                },
                total: state.total - INGREDIENTS_PRICE[action.ingredientsType]  
            };
        default:
            return state;
    }
}

export default reducer;