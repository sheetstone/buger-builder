import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    
    if (props.isAuth) {
        
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Build Burger</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            {
                props.isAuth
                    ? <NavigationItem link='/logout'>Logout</NavigationItem>
                    : <NavigationItem link='/auth'>Authenticate</NavigationItem>
            }
        </ul>
    )
}

export default navigationItems;