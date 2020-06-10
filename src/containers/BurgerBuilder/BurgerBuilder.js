import React, { Component } from "react";
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions';
import axios from '../../axios-order';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        isSubmitting: false,
        error: null
    }

    componentDidMount() {
        this.props.onInitIngriendients();
        this.props.onInitPurchase();
    }

    updatePurchaseState(updatedIngrients) {
        this.props.onTotalUpdate();
        return this.props.total>0;
    }

    purchasingHandler = (status) => {
        if (this.props.isAuthenticated){
            this.setState({purchasing: status});
        } else {
            this.props.history.push({pathname: '/auth'});
        }

        
    }

    purchaseContinueHandler = () => {
        this.props.history.push({ pathname: '/checkout'});
        this.props.onInitPurchase();
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        let burger = <Spinner />;
        if (this.props.error){
            burger = <p>There is some error to trieve ingredient!</p>
        }
        let orderSummary = <Spinner />;

        if(this.props.ingredients) {
            for (let key in disabledInfo){
                disabledInfo[key] = (disabledInfo[key] <= 0);
            }
    
            if (!this.state.isSubmitting) orderSummary = ( 
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    total={this.props.total}
                    purchasingContinued={this.purchaseContinueHandler}
                    purchasingCanceled={() => this.purchasingHandler(false)}
                />);

            burger = (
                <Aux>
                    <Burger burgerIngredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabledInfo={disabledInfo} 
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        purchasing={() => this.purchasingHandler(true)}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.total}/>
                </Aux>
            );
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} close={() => this.purchasingHandler(false)}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));