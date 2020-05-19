import React from 'react';
import BurgerLogo from '../../assets/images/original.png';
import classes from './Logo.module.scss';

const logo = () => (
    <img src={BurgerLogo} className={classes.Logo} alt="Burger Builder Site" />
);

export default logo;