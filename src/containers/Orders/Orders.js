import React, { Component } from "react";
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Order.module.scss';
import axios from '../../axios-order';

 
class Orders extends Component {
    state = {
        orders: null,
        isLoading: true,
        error: null
    }

    componentDidMount(){
        this.setState({isLoading: true});
        axios.get('/orders.json')
        .then(response => {
            this.setState({
                orders: response.data,
                isLoading: false
            });
            
        })
        .catch(error => {
            this.setState({error: error});
        })
    }
    
    render() {
        let ordersList = <Spinner />;
        if (!this.state.isLoading) {
            ordersList = [];
            for (let [key, item] of Object.entries(this.state.orders)){
                ordersList.push(<Order key={key} ingredients={item.ingredients} price={item.price}/>)
            }
        }
        return (
            <ul className={classes.Orders}>
                {ordersList}            
            </ul>
        );
    }
}

export default Orders;