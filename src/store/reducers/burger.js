import * as actionType from '../actions/actionTypes'

const initalState = {
    ingredients: null,
    total: 4,
    error: false,
    building: true
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
                total: INGREDIENTS_PRICE[action.ingredientsType] + state.total,
                building: true
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsType]: state.ingredients[action.ingredientsType] - 1
                },
                total: state.total - INGREDIENTS_PRICE[action.ingredientsType],
                building: true
            };
        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredients: {...action.ingredients},
                building: false
            };
        case actionType.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionType.UPDATA_TOTAL:
            const ingredients = {...state.ingredients};
            const sum = Object.keys(state.ingredients).map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el)=>{
                return sum + el
            }, 0);
            return {
                ...state,
                total: sum
            }
        default:
            return state;
    }
}

export default reducer;