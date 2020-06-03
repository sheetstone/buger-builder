import React, {Component} from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDate from './ContactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {
    state = {
        isSubmitting: false
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push({
            pathname:'/checkout/contact-data',
            state: this.state
        });
    }

    render() {
        const ingredients = this.props.ingredients;
        const checkout = <>
                        <CheckoutSummary 
                            ingredients={ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />
                        <Route path={this.props.match.url+'/contact-data'}
                            component={ContactDate} />
                        </>
        
        return (checkout)
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        total: state.total
    }
}

export default connect(mapStateToProps)(Checkout);