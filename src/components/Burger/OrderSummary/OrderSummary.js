import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <strong style={{textTransform: 'capitalize'}}>{igKey}</strong>:
                    {props.ingredients[igKey]}
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
            <p>The total is: <strong>${props.total.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger"  clicked={props.purchasingCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchasingContinued} >CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;