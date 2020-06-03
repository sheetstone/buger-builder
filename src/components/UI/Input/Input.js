import React from 'react';

import classes from './Input.module.scss';

const input = ( props ) => {
    let inputElement = null;
    const inputClass = [classes.InputElement];

    if (!props.valid && props.validation && props.touched){
        inputClass.push(classes.inValid);
    }

    switch ( props.elementType ) {
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClass.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;