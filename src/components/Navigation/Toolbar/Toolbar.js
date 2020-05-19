import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';


const toolbar = () => (
    <header className = {classes.Toolbar}>
        <div className={classes.Logo}>
             <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigations />
        </nav>
    </header>
)

export default toolbar