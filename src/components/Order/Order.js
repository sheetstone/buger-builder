import React from 'react';
import classes from './Order.module.scss';

const order = (props) => {

    let ingredients = [];
    for (let [key, item] of Object.entries(props.ingredients)){
        ingredients.push(<span key={Math.random()} className={classes.Ingredients}>{key}: ({item})</span>)
    }
    return (

        <li className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </li>
    )
}

export default order