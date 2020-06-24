import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';
import WithErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import * as actionCreator from '../../../store/actions/index';
import { checkValidation } from '../../../share/checkValidation';

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
                pattern: /^[a-z ,.'-]+$/i
            },
            valid: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your zipCode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                pattern: /^[0-9]{5}(?:-[0-9]{4})?$/i
            },
            valid: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{
                    value: 'fastest',
                    displayValue: 'Fastest - 4$'
                },{
                    value: 'medium',
                    displayValue: 'Medium - 2$'
                },{
                    value: 'slow',
                    displayValue: 'Slow (free)'
                }]
            },
            valid: true,
            value: 'fastest'
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const order = {
            ingredients: props.ingredients,
            price: props.total,
            customer: {
                name: orderForm.name.value,
                address: {
                    street: orderForm.street.value,
                    zipCode: orderForm.zipCode.value,
                    country: orderForm.country.value
                },
                email: orderForm.email.value,
                deliveryMethod: orderForm.deliveryMethod.value,
            },
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const valueChangeHandler = (e, key) => {
        const newOrderForm = {...orderForm};
        const orderFormEle = {...newOrderForm[key]};
        orderFormEle.value = e.target.value;
        orderFormEle.valid = orderFormEle.validation?checkValidation(e.target.value, orderFormEle.validation):true;
        orderFormEle.touched = true;
        newOrderForm[key] = orderFormEle;

        let newFormIsValid = true;
        for (let [, item] of Object.entries(orderForm)) {
            newFormIsValid = (newFormIsValid && !!item.valid);
        }   
        setOrderForm(newOrderForm);
        setFormIsValid(newFormIsValid);
    }


    let form = <Spinner />;
    let formElementArray = [];
    for (let [key, item] of Object.entries(orderForm)){
        formElementArray.push(<Input name={key} {...item} key={key} changed={(e)=>valueChangeHandler(e, key)}/>)
    }
    if (!props.loading) {
        form = (
            <form className={classes.ContactForm}>
                {formElementArray}
                <Button btnType='Success' clicked={submitHandler} disabled={!formIsValid}>ORDER</Button>
            </form>
        );
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        total: state.burger.total,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderDate, token) => dispatch(actionCreator.purchaseBurger(orderDate, token))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));