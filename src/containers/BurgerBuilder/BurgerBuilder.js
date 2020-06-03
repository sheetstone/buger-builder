import React, { Component } from "react";
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import * as actionType from '../../store/action';




class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        isSubmitting: false,
        error: null
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: error});
        //     })
    }

    updatePurchaseState(updatedIngrients) {
        const ingredients = {...updatedIngrients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum + el
        }, 0);
        return sum>0;
    }

    purchasingHandler = (status) => {
        this.setState({purchasing: status});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({ pathname: '/checkout'});
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        let burger = <Spinner />;
        if (this.state.error){
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
        ingredients: state.ingredients,
        total: state.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (type) => dispatch({type: actionType.ADD_INGREDIENT, ingredientsType: type}),
        onIngredientRemoved: (type) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientsType: type})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));