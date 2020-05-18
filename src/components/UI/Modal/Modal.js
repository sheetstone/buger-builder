import React from 'react';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => (
    <Aux>
        <div className={classes.Modal} 
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.close}/>
    </Aux>

);

export default modal;