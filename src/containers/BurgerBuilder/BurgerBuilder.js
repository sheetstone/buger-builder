import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

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

    const {onInitIngriendients, onInitPurchase} = props;

    useEffect(()=> {
        onInitIngriendients();
        onInitPurchase();
    },[onInitIngriendients, onInitPurchase])

    const updatePurchaseState = () => {
        props.onTotalUpdate();
        return props.total>0;
    }

    const purchasingHandler = (status) => {
        if (props.isAuthenticated){
            setPurchasing(status);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push({pathname: '/auth'});
        }        
    }

    const purchaseContinueHandler = () => {
        props.history.push({ pathname: '/checkout'});
        props.onInitPurchase();
    }


    const disabledInfo = {
        ...props.ingredients
    }

    let burger = <Spinner />;
    if (props.error){
        burger = <p>There is some error to retrieve ingredient!</p>
    }
    let orderSummary = <Spinner />;

    if(props.ingredients) {
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        orderSummary = ( 
            <OrderSummary 
                ingredients={props.ingredients} 
                total={props.total}
                purchasingContinued={purchaseContinueHandler}
                purchasingCanceled={() => purchasingHandler(false)}
            />);

        burger = (
            <Aux>
                <Burger burgerIngredients={props.ingredients} />
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved} 
                    disabledInfo={disabledInfo} 
                    purchasable={updatePurchaseState}
                    purchasing={() => purchasingHandler(true)}
                    isAuth={props.isAuthenticated}
                    price={props.total}/>
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

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        total: state.burger.total,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (type) => dispatch(actionCreator.addIngredient({ingredientsType: type})),
        onIngredientRemoved: (type) => dispatch(actionCreator.removeIngredient({ingredientsType: type})),
        onInitIngriendients: (type) => dispatch(actionCreator.initIngredients()),
        onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
        onTotalUpdate: () => dispatch(actionCreator.updateTotal()),
        onSetRedirectPath: (path) => dispatch(actionCreator.setRedirectPath({path: path}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);