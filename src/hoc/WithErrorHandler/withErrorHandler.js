import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios, message) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }, err => {
            console.log(message, err)
            setError(err);
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            console.log(message, err)
            setError(err);
        });

        useEffect (() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor])
        
        const errorConfirmedHandler = () => {
            setError(null);
        }

        console.log(message, error);

        return (
            <Aux>
                <Modal show={error}
                    close={errorConfirmedHandler}>
                    {error? error.message: null};
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    };
}

export default withErrorHandler;