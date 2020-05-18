import React from 'react';
import classes from './BuildControl.module.scss';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;