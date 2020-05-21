import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <strong style={{textTransform: 'capitalize'}}>{igKey}</strong>:
                    {this.props.ingredients[igKey]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>The total is: <strong>${this.props.total.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger"  clicked={this.props.purchasingCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchasingContinued} >CONTINUE</Button>
            </Aux>
        )
    }
}

export default orderSummary;