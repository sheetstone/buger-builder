import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';

import axios from '../../../axios-order';

class ContactData extends Component {
    state = {
        order: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            ingredients: null,
            isSubmitting: false
        }
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.setState({ isSubmitting: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.total,
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

    render() {
        console.log(this.props)
        let form = <Spinner />;
        if (!this.state.isSubmitting) {
            form = (
                <form className={classes.ContactForm}>
                    <input type='text' name='name' placeholder="Your Name" />
                    <input type='email' name='email' placeholder="Your Email" />
                    <input type='text' name='street' placeholder="Street" />
                    <input type='text' name='postal' placeholder="Postal Code" />
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