import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active>Build Burger</NavigationItem>
        <NavigationItem link='/'>Check Out</NavigationItem>
    </ul>
)

export default navigationItems;