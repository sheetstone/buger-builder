import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        total: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState(updatedIngrients) {
        const ingredients = {...updatedIngrients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum + el
        }, 0);
        this.setState({purchasable: sum>0})
    }

    purchasingHandler = (status) => {
        this.setState({purchasing: status});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngrients = {
            ...this.state.ingredients
        };
        updatedIngrients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type] + this.state.total;

        this.updatePurchaseState(updatedIngrients);
        this.setState({
            ingredients: updatedIngrients,
            total: priceAddition
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount >= 1){
            const updatedCount = oldCount - 1;
            const updatedIngrients = {
                ...this.state.ingredients
            };
            updatedIngrients[type] = updatedCount;
            const priceDeduction = this.state.total - INGREDIENTS_PRICE[type];
    
            this.updatePurchaseState(updatedIngrients);
            this.setState({
                ingredients: updatedIngrients,
                total: priceDeduction
            })
        }
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        return (
            <Aux>
                <Model show={this.state.purchasing} close={() => this.purchasingHandler(false)}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    total={this.state.total}
                    purchasingContinued={this.purchaseContinueHandler}
                    purchasingCanceled={() => this.purchasingHandler(false)}
                />
                </Model>
                <Burger burgerIngredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabledInfo={disabledInfo} 
                    purchasable={this.state.purchasable}
                    purchasing={() => this.purchasingHandler(true)}
                    price={this.state.total}/>
            </Aux>
        );
    }
}

export default BurgerBuilder