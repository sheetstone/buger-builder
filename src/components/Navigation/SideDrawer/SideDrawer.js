import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.scss';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Hamburger from '../Toolbar/Hamburger/Hamburger';
import Aux from '../../../hoc/Aux/Aux'


const sideDrawer = (props) => {
    const toggledClasses = [classes.SideDrawer, props.show?classes.Open:classes.Close].join(' ');

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.showed}/>
            <div className={toggledClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
                <div className={classes.CloseBtn}>
                    <Hamburger open={true} clicked={props.showed} />
                </div>
            </div>
        </Aux>
    )
}

export default sideDrawer;