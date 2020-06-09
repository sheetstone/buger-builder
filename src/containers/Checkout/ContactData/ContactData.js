import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';
import WithErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import * as actionCreator from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false
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

        if (rules.pattern) {
            isValid = rules.pattern.test(value) && isValid;
        }

        return isValid;
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.total,
            customer: {
                name: this.state.orderForm.name.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zipCode: this.state.orderForm.zipCode.value,
                    country: this.state.orderForm.country.value
                },
                email: this.state.orderForm.email.value
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    valueChangeHandler = (e, key) => {
        const orderForm = {...this.state.orderForm};
        const orderFormEle = {...orderForm[key]};
        orderFormEle.value = e.target.value;
        orderFormEle.valid = orderFormEle.validation?this.checkValidation(e.target.value, orderFormEle.validation):true;
        orderFormEle.touched = true;
        orderForm[key] = orderFormEle;
        // console.log(orderFormEle);

        let formIsValid = true;
        for (let [, item] of Object.entries(this.state.orderForm)) {
            formIsValid = (formIsValid && !!item.valid);
        }   
        this.setState(
            {
                orderForm: orderForm,
                formIsValid: formIsValid
            });
    }

    render() {
        let form = <Spinner />;
        let formElementArray = [];
        for (let [key, item] of Object.entries(this.state.orderForm)){
            formElementArray.push(<Input name={key} {...item} key={key} changed={(e)=>this.valueChangeHandler(e, key)}/>)
        }
        if (!this.props.loading) {
            form = (
                <form className={classes.ContactForm}>
                    {formElementArray}
                    <Button btnType='Success' clicked={this.submitHandler} disabled={!this.state.formIsValid}>ORDER</Button>
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
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        total: state.burger.total,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderDate, token) => dispatch(actionCreator.purchaseBurger(orderDate, token))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));