import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDate from './ContactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {
    state = {
        ingredients: null,
        total: 0,
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

    componentDidMount = () => {
        this.setState({
            ...this.props.location.state
        })
    }

    render() {
        const ingredients = (this.props.location.state)?this.props.location.state.ingredients:this.state.ingredients;
        const checkout = <>
                        <CheckoutSummary 
                            ingredients={ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />
                        <Route path={this.props.match.url+'/contact-data'}
                            render={(props) => <ContactDate ingredients={this.state.ingredients} total={this.state.total} {...props}/>} />
                        </>
        
        return (checkout)
    }
}

export default Checkout;