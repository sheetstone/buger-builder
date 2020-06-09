import React, { Component } from "react";
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Order.module.scss';
import * as actionCreator from '../../store/actions';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';


class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let ordersList = <Spinner />;
        if (!this.props.isLoading) {
            if (this.props.orders!==null){
                ordersList = [];
                for (let [key, item] of Object.entries(this.props.orders)){
                    ordersList.push(<Order key={key} ingredients={item.ingredients} price={item.price}/>)
                }
            }else{
                ordersList = <p> Have no burger order yet!</p>
            }
        }
        return (
            <ul className={classes.Orders}>
                {ordersList}            
            </ul>
        );
    }
}
const mapStateToProps = state => ({
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    uid: state.auth.userId,
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch( actionCreator.fetchOrders(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));