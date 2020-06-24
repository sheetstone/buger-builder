import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actionCreator from '../../store/actions/index';


import classes from './Auth.module.scss';

const Auth = (props) => {
    const [control, setControl] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false
        },
    })
    const [formIsValid, setFormIsValid] = useState(false);
    const [errorClient, setErrorClient] = useState({
        message: ''
    })
    const [isSignUp, setIsSignUp] = useState(true);

    const {buildingBurger, authRedirectPath, onSetRedirectPath} = props

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetRedirectPath])

    const checkValidation = (value, rules) => {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // eslint-disable-line no-useless-escape
            isValid = pattern.test(value) && isValid;
        }

        if (rules.pattern) {
            isValid = rules.pattern.test(value) && isValid;
        }
        return isValid;
    }

    const valueChangeHandler = (e, key) => {
        const orderForm = { ...control };
        const orderFormEle = { ...orderForm[key] };
        orderFormEle.value = e.target.value;
        orderFormEle.valid = orderFormEle.validation ? checkValidation(e.target.value, orderFormEle.validation) : true;
        orderFormEle.touched = true;
        orderForm[key] = orderFormEle;

        let valid = true;
        for (let [, item] of Object.entries(orderForm)) {
            valid = (valid && !!item.valid);
        }
        let errorMsg = '';
        if (!valid) {
            errorMsg = "2-Has Error, please fix.";
        }

        setControl(orderForm);
        setFormIsValid(valid);
        setErrorClient({message: errorMsg});
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(prev => !prev)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            props.onAuth({
                email: control.email.value,
                password: control.password.value,
                isSignUp: isSignUp
            })
        } else {
            let errorMsg = "Has Error, please fix.";
            const orderForm = { ...control };
            for (let key in orderForm) {
                const orderFormEle = { ...orderForm[key] };
                orderFormEle.touched = true;
                orderForm[key] = orderFormEle;
            }
            setControl(orderForm);
            setErrorClient({message: errorMsg});
        }
    }


    let form = null;

    let formElementArray = [];
    for (let [key, item] of Object.entries(control)) {
        formElementArray.push(<Input name={key} {...item} key={key} changed={(e) => valueChangeHandler(e, key)} />)
    }

    if (props.isLoading) {
        form = <Spinner />
    } else {
        form = (
            <form className={classes.AuthForm}>
                {formElementArray}
                <Button btnType="Success"> {isSignUp ? 'SUBMIT' : 'SIGNIN'}  </Button>
            </form>)
    }

    let errorMessage = [];
    if (!formIsValid && errorClient.message.length > 0) {
        errorMessage.push(<p className={classes.HasError} key={Math.random()}>{errorClient.message}</p>);
    }

    if (props.errorServer) {
        errorMessage.push(<p className={classes.HasError} key={props.errorServer.message + Math.random()}>{props.errorServer.message}</p>);
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth} onSubmit={submitHandler}>
            {authRedirect}
            {form}
            {errorMessage}
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        errorServer: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (authData) => dispatch(actionCreator.auth(authData)),
        onSetRedirectPath: () => dispatch(actionCreator.setRedirectPath({ path: '/' }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);