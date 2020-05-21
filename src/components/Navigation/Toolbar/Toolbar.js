import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';
import Hamburger from './Hamburger/Hamburger'


const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <Hamburger open={props.sideDrawOpen} clicked={props.hamburgerClicked}/>
        <div className={classes.Logo} >
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigations />
        </nav>
    </header>
)

export default toolbar