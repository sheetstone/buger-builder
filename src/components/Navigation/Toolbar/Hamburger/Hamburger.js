import React from 'react';
import classes from './Hamburger.module.scss';

const hamburger = (props) => {
    const openClass = [classes.Hamburger, props.open?classes.Open:null].join(' ');
    return (
        <div className={openClass} onClick={props.clicked}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default hamburger;