import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.scss';

import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'


const sideDrawer = (props) => {
    return (
        <Aux>
            <div className={classes.SideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
            <Backdrop show='true'/>
        </Aux>
    )
}

export default sideDrawer;