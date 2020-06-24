import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import WithErrorModal from '../../hoc/WithErrorHandler/withErrorModal'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions';


export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useCallback(useDispatch(),[]);
    const {ingredients, total, error} = useSelector(state => {
        return state.burger
    })
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    })

    const onIngredientAdded= (type) => dispatch(actionCreator.addIngredient({ingredientsType: type}));
    const onIngredientRemoved= (type) => dispatch(actionCreator.removeIngredient({ingredientsType: type}));
    const onInitIngriendients= useCallback(() => dispatch(actionCreator.initIngredients()),[dispatch]);
    const onInitPurchase= useCallback(() => dispatch(actionCreator.purchaseInit()), [dispatch]);
    const onTotalUpdate= () => dispatch(actionCreator.updateTotal());
    const onSetRedirectPath= (path) => dispatch(actionCreator.setRedirectPath({path: path}));

    useEffect(()=> {
        onInitIngriendients();
        onInitPurchase();
    },[onInitIngriendients, onInitPurchase])

    const updatePurchaseState = () => {
        onTotalUpdate();
        return total>0;
    }

    const purchasingHandler = (status) => {
        if (isAuthenticated){
            setPurchasing(status);
        } else {
            onSetRedirectPath('/checkout');
            props.history.push({pathname: '/auth'});
        }        
    }

    const purchaseContinueHandler = () => {
        props.history.push({ pathname: '/checkout'});
        onInitPurchase();
    }


    const disabledInfo = {
        ...props.ingredients
    }

    let burger = <Spinner />;
    if (error){
        burger = <p>There is some error to retrieve ingredient!</p>
    }
    let orderSummary = <Spinner />;

    if(ingredients) {
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        orderSummary = ( 
            <OrderSummary 
                ingredients={ingredients} 
                total={total}
                purchasingContinued={purchaseContinueHandler}
                purchasingCanceled={() => purchasingHandler(false)}
            />);

        burger = (
            <Aux>
                <Burger burgerIngredients={ingredients} />
                <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved} 
                    disabledInfo={disabledInfo} 
                    purchasable={updatePurchaseState}
                    purchasing={() => purchasingHandler(true)}
                    isAuth={isAuthenticated}
                    price={total}/>
            </Aux>
        );
    }

    return (
        <Aux>
            <Model show={purchasing} close={() => purchasingHandler(false)}>
                {orderSummary}
            </Model>
            <WithErrorModal error={props.error}>
                {burger}
            </WithErrorModal>
        </Aux>
    );
    
}

export default BurgerBuilder;