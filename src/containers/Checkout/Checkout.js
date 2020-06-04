import React, {Component} from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDate from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';


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
        let summary = <Redirect to='/' />
        if (this.props.ingredients){
            const redirection = (this.props.purchased)? <Redirect to='/' /> : null
            summary = (
                    <>
                        {redirection}
                        <CheckoutSummary 
                            ingredients={this.props.ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />
                        <Route path={this.props.match.url+'/contact-data'}
                            component={ContactDate} />
                    </>
            )
        }
 
        return (summary)
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        total: state.burger.total,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);