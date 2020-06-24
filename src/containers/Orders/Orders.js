import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Order.module.scss';
import * as actionCreator from '../../store/actions';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';


const Orders = (props) => {
    const {onFetchOrders, token, uid} = props;

    useEffect(() => {
        onFetchOrders(token, uid);
    },[onFetchOrders, token, uid])

    let ordersList = <Spinner />;
    if (!props.isLoading) {
        if (props.orders!==null){
            ordersList = [];
            for (let [key, item] of Object.entries(props.orders)){
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
const mapStateToProps = state => ({
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    uid: state.auth.userId,
})

const dispatch = useDispatch();
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch( actionCreator.fetchOrders(token, userId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));