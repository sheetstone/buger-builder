import React from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDate from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';


const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.push({
            pathname:'/checkout/contact-data'
        });
    }


    let summary = <Redirect to='/' />
    if (props.ingredients){
        const redirection = (props.purchased)? <Redirect to='/' /> : null
        summary = (
                <>
                    {redirection}
                    <CheckoutSummary 
                        ingredients={props.ingredients}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler} />
                    <Route path={props.match.url+'/contact-data'}
                        component={ContactDate} />
                </>
        )
    }

    return (summary)
  
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        total: state.burger.total,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);