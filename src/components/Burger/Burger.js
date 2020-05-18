import React from 'react';

import BurgerIngredint from './BurgerIngredint/Bugeringredient'
import classes from './Burger.module.scss';

const burger = (props) => {
    const { burgerIngredients } = props;
    let burgerIngredintList = Object.keys(burgerIngredients)
            .map(igKey => {
                return [...Array(burgerIngredients[igKey])].map((_, i) => (
                    <BurgerIngredint key={igKey + i} type={igKey} />
                ))
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []); 
    if (burgerIngredintList.length === 0){
        burgerIngredintList = <p>Please start adding ingredients.</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredint type='bread-top'/>
            { burgerIngredintList }
            <BurgerIngredint type='bread-bottom'/>
        </div>
    );
};

export default burger;
