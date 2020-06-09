import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actionCreator from '../../store/actions/index';

import classes from './Auth.module.scss';

class Auth extends Component {
    state = {
        control: {
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
        },
        formIsValid: false,
        errorClient: {
            message: ''
        },
        isSignUp: true,
    }

    checkValidation(value, rules) {
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
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            isValid = pattern.test(value) && isValid;
        }

        if (rules.pattern) {
            isValid = rules.pattern.test(value) && isValid;
        }
        return isValid;
    }


    valueChangeHandler = (e, key) => {
        const orderForm = {...this.state.control};
        const orderFormEle = {...orderForm[key]};
        orderFormEle.value = e.target.value;
        orderFormEle.valid = orderFormEle.validation?this.checkValidation(e.target.value, orderFormEle.validation):true;
        orderFormEle.touched = true;
        orderForm[key] = orderFormEle;

        let formIsValid = true;
        for (let [, item] of Object.entries(orderForm)) {
            formIsValid = (formIsValid && !!item.valid);
        }   

        let errorMessage = '';
        if (!formIsValid){
            errorMessage = "2-Has Error, please fix.";
        }
        
        this.setState(
            {
                control: orderForm,
                formIsValid: formIsValid,
                error: {
                    message: errorMessage
                }
            });
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.formIsValid){
            this.props.onAuth({
                email: this.state.control.email.value,
                password: this.state.control.password.value,
                isSignUp: this.state.isSignUp
            })
        } else {
            let errorMessage = "Has Error, please fix.";
            const orderForm = {...this.state.control};
            for (let key in orderForm){
                const orderFormEle = {...orderForm[key]};
                orderFormEle.touched = true;
                orderForm[key] = orderFormEle;
            }

            this.setState({
                control: orderForm,
                error:{
                    message: errorMessage
                }
            });
            this.render();
        }
    }

    render () {
        let form = null;

        let formElementArray = [];
        for (let [key, item] of Object.entries(this.state.control)){
            formElementArray.push(<Input name={key} {...item} key={key} changed={(e)=>this.valueChangeHandler(e, key)}/>)
        }

        if (this.props.isLoading){
            form = <Spinner />
        } else {
            form = (
                <form  className={classes.AuthForm}>
                    {formElementArray}
                    <Button btnType="Success"> {this.state.isSignUp?'SUBMIT':'SIGNIN'}  </Button>
                </form>)
        }

        let errorMessage = [];
        if (!this.state.formIsValid && this.state.errorClient.message.length>0){
            errorMessage.push(<p className={classes.HasError}>{this.state.errorClient.message}</p>);
        }

        if(this.props.errorServer){
            errorMessage.push(<p className={classes.HasError}>{this.props.errorServer.message}</p>);
        }

        
        return (
            <div className={classes.Auth} onSubmit={this.submitHandler}>
                {form}
                {errorMessage}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        errorServer: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (authData) => dispatch(actionCreator.auth(authData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);