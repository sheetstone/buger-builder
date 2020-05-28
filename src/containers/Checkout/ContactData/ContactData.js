import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';

import axios from '../../../axios-order';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
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
                }
            }
        },
        ingredients: null,
        isSubmitting: false
    }


    submitHandler = (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.total,
            customer: {
                name: 'Hong Zhang',
                address: {
                    street: 'teststreet1',
                    zipCode: '41351',
                    country: 'US'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    isSubmitting: false,
                    purchasing: false
                });
                console.info("Submit successful");
                console.info("Redirecting...");
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    purchasing: false
                });
                console.log(error)
            })
    }

    valueChangeHandler = (e, key) => {
        console.log(e.target);
        console.log(key);
        this.state.orderForm[key].value=e.target.value;
    }

    render() {
        let form = <Spinner />;
        let formElementArray = [];
        for (let [key, item] of Object.entries(this.state.orderForm)){
            formElementArray.push(<Input name={key} {...item} key={key} changed={(e)=>this.valueChangeHandler(e, key)}/>)
        }
        if (!this.state.isSubmitting) {
            form = (
                <form className={classes.ContactForm}>
                    {formElementArray}
                    <Button btnType='Success' clicked={this.submitHandler}>ORDER</Button>
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

export default ContactData